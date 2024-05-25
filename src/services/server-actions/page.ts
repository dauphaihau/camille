'use server';

import {
  Page, Prisma, Teamspace, Workspace
} from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { StatusCodes } from 'http-status-codes';
import * as z from 'zod';
import { db } from 'lib/db';
import {
  IAddPageToFavorite, ICreatePage, IDeletePage, IUpdatePage
} from 'types/page';
import { DELETE_PAGE_TYPE } from 'config/const';
import { getCurrentUser } from '../../lib/session';
import {
  addPageToFavoriteSchema,
  createPageSchema,
  deletePageSchema,
  updatePageSchema
} from '../../validations/page';
import { freePlan } from '../../config/subscriptions';
import { getWorkspaceSubscriptionPlan } from './subscription';

dayjs.extend(utc);

export async function getFavoritePages(
  workspaceId?: Workspace['id']
) {
  const user = await getCurrentUser();
  if (!user) return;

  const favorites = await db.favorite.findMany({
    where: { userId: user.id, workspaceId },
    select: { pageId: true },
  });

  const pageIds = favorites.map(item => item.pageId);

  const pages = await db.page.findMany({
    where: {
      id: { in: pageIds },
      deletedAt: null,
    },
    include: {
      updatedByUser: {
        select: {
          email: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'asc',
    },
  });

  return pages.map((page) => ({ ...page, isFavorite: true }));
}

export async function getPrivatePages(
  workspaceId?: Workspace['id']
) {
  const user = await getCurrentUser();
  if (!user || !workspaceId) return ;

  const pages = await db.page.findMany({
    where: {
      workspaceId,
      createdBy: user.id,
      teamspaceId: null,
      deletedAt: null,
    },
    include: {
      updatedByUser: {
        select: {
          email: true,
        },
      },
      favorites: {
        where: {
          userId: user.id,
        },
      },
    },
  });

  return pages.map((page) => {
    const { favorites,...res } = page;
    return { ...res, isFavorite: favorites && favorites.length > 0 };
  });
}

// export const selectPagesPrivate = Prisma.validator<Prisma.PageArgs>()({
//   select: {
//     id: true,
//     title: true,
//     deletedAt: true,
//     notebook: {
//       select: {
//         id: true,
//         title: true,
//       },
//     },
//   },
// });

export async function getPagesDeleted(
  workspaceId?: Workspace['id'],
  searchTitle?: string
) {
  const user = await getCurrentUser();

  if (!user || !workspaceId) return;

  const where: Prisma.PageWhereInput = {
    workspaceId,
    createdBy: user.id,
    deletedAt: { not: null },
  };

  if (searchTitle && where) {
    where.title = {
      contains: searchTitle.toLowerCase(),
    };
  }

  return db.page.findMany({
    where,
    select: {
      id: true,
      title: true,
      deletedAt: true,
      teamspaceId: true,
      teamspace: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      deletedAt: 'desc',
    },
  });
}

export async function getPage(pageId?: Page['id']) {
  const user = await getCurrentUser();
  if (!user) return;

  const page = await db.page.findFirst({
    where: {
      id: pageId,
    },
    include: {
      favorites: {
        where: {
          userId: user.id,
        },
      },
      teamspace: {
        select: {
          name: true,
        },
      },
      updatedByUser: {
        select: {
          email: true,
        },
      },
    },
  });
  return { ...page, isFavorite: (page?.favorites && page.favorites.length > 0) || false };
}

// get pages by title, or initial load pages by date
export async function getSearchPage(
  workspaceId?: Workspace['id'],
  searchValue?: string
) {
  const queries: Prisma.PageFindManyArgs = {
    where: {
      workspaceId,
      deletedAt: null,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  };

  if (!queries?.where || !workspaceId) return;

  if (searchValue) {
    queries.where.title = {
      contains: searchValue.toLowerCase(),
    };
    const pages = await db.page.findMany(queries);
    return { pages };
  }

  const dateUtcOffSet0 = dayjs().utcOffset(0).startOf('date');
  const dateUtc = dayjs().utc();

  const today = dateUtcOffSet0.toDate(); // or format
  const yesterday = dateUtc.subtract(1, 'day').format();
  const twoDayAgo = dateUtc.subtract(2, 'day').format();
  const oneWeekAgo = dateUtc.subtract(1, 'week').format();
  const oneMonthAgo = dateUtc.subtract(1, 'month').format();
  const twoMonthAgo = dateUtc.subtract(2, 'month').format();

  delete queries.where.title;

  queries.where.updatedAt = { gt: yesterday };
  const pagesToday = await db.page.findMany(queries);

  queries.where.updatedAt = { lt: today, gt: twoDayAgo };
  const pagesOfYesterday = await db.page.findMany(queries);

  queries.where.updatedAt = { lte: oneWeekAgo, gte: oneMonthAgo };
  const pagesOneWeekAgo = await db.page.findMany(queries);

  queries.where.updatedAt = { lte: oneMonthAgo, gt: twoMonthAgo };
  const pagesOneMonthAgo = await db.page.findMany(queries);

  queries.where.updatedAt = { lte: twoMonthAgo };
  const pagesOlder = await db.page.findMany(queries);

  return {
    pagesToday, pagesOfYesterday, pagesOneWeekAgo, pagesOneMonthAgo, pagesOlder,
  };
}

export async function createPage(values: ICreatePage) {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = createPageSchema.parse(values);

    const subscriptionPlan = await getWorkspaceSubscriptionPlan(validatedValues.workspaceId);

    if (!subscriptionPlan?.isStandard) {
      const totalMembers = await db.userOnWorkspace.count({
        where: { workspaceId: validatedValues.workspaceId },
      });

      if (totalMembers > 1) {
        const total = await db.page.count({
          where: {
            workspace: { id: validatedValues.workspaceId },
            deletedAt: null,
          },
        });

        if (total >= freePlan.limitedPages) {
          // throw new RequiresStandardPlanError();
          return { code: StatusCodes.PAYMENT_REQUIRED };
        }
      }
    }

    const page = await db.page.create({
      data: {
        workspaceId: validatedValues.workspaceId,
        teamspaceId: validatedValues?.teamspaceId ?? null,
        title: validatedValues?.title ?? '',
        content: validatedValues?.content ?? '',
        updatedBy: user.id,
        createdBy: user.id,
      },
      select: {
        id: true,
      },
    });

    return {
      code: StatusCodes.CREATED,
      data: {
        pageId: page.id,
      },
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
}

export async function updatePage(values: IUpdatePage) {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const { id: pageId, ...validatedValues } = updatePageSchema.parse(values);

    const page = await db.page.findUnique({
      where: {
        id: pageId,
      },
    });
    if (!page) return { code: StatusCodes.NOT_FOUND };

    if (validatedValues?.title && !validatedValues.title) {
      validatedValues.title = 'Untitled page';
    }

    await db.page.update({
      where: {
        id: page.id,
      },
      data: {
        ...validatedValues,
        updatedBy: user.id,
      },
    });

    return { code: StatusCodes.OK };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
}

// delete page by status
export async function deletePage(values: IDeletePage) {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = deletePageSchema.parse(values);

    switch (validatedValues.type) {
      case DELETE_PAGE_TYPE.SOFT_DELETE:
        await db.page.update({
          where: {
            id: validatedValues.pageId,
          },
          data: {
            deletedBy: user.id,
            deletedAt: new Date(),
          },
        });
        break;
      case DELETE_PAGE_TYPE.HARD_DELETE:
        await db.page.delete({
          where: { id: validatedValues.pageId },
        });
        break;
      case DELETE_PAGE_TYPE.RECOVER: {

        const subscriptionPlan = await getWorkspaceSubscriptionPlan(validatedValues.workspaceId);

        if (!subscriptionPlan?.isStandard) {
          const totalMembers = await db.userOnWorkspace.count({
            where: { workspaceId: validatedValues.workspaceId },
          });

          if (totalMembers > 1) {
            const total = await db.page.count({
              where: {
                workspace: { id: validatedValues.workspaceId },
                deletedAt: null,
              },
            });

            if (total >= freePlan.limitedPages) {
              return { code: StatusCodes.PAYMENT_REQUIRED };
            }
          }
        }

        await db.page.update({
          where: {
            id: validatedValues.pageId,
          },
          data: {
            deletedBy: null,
            deletedAt: null,
          },
        });
      }
    }

    return { code: StatusCodes.NO_CONTENT };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
}

export async function updateFavoritePage(values: IAddPageToFavorite) {
  try {
    const user = await getCurrentUser();
    if (!user) return { code: StatusCodes.UNAUTHORIZED };

    const validatedValues = addPageToFavoriteSchema.parse(values);

    const favorite = await db.favorite.findFirst({
      where: {
        userId: user.id,
        pageId: validatedValues.pageId,
        workspaceId: validatedValues.workspaceId,
      },
    });

    if (!favorite) {
      await db.favorite.create({
        data: {
          user: {
            connect: { id: user.id },
          },
          workspace: {
            connect: { id: validatedValues.workspaceId },
          },
          page: {
            connect: { id: validatedValues.pageId },
          },
        },
      });
      return { code: StatusCodes.OK };
    }

    await db.favorite.delete({
      where: { id: favorite.id },
    });
    return { code: StatusCodes.OK };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    return { code: StatusCodes.INTERNAL_SERVER_ERROR };
  }
}

export const getPagesByTeamspace = async (teamspaceId?: Teamspace['id']) => {
  const user = await getCurrentUser();
  if (!user || !teamspaceId) return;

  const pages = await db.page.findMany({
    where: {
      teamspaceId,
      deletedAt: null,
    },
    include: {
      updatedByUser: {
        select: {
          email: true,
        },
      },
      favorites: {
        where: {
          userId: user.id,
        },
      },
    },
  });

  return pages.map((page) => {
    return { ...page, isFavorite: page.favorites && page.favorites.length > 0 };
  });
};
