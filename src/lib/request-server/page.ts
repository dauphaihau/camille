'use server';

import {
  Page, Prisma, Workspace
} from '@prisma/client';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { db } from 'lib/db';
import { getCurrentUser } from '../session';

dayjs.extend(utc);

export async function getFavoritePages(
  workspaceId?: Workspace['id']
) {
  const user = await getCurrentUser();
  if (!user?.id) return;

  const favorites = await db.favorite.findMany({
    where: { userId: user.id, workspaceId },
    select: { pageId: true },
  });
  const arrPageId = favorites.map(item => item.pageId);

  const pages = await db.page.findMany({
    where: {
      id: { in: arrPageId },
      deletedAt: null,
    },
    include: {
      notebook: {
        select: {
          id: true,
          title: true,
        },
      },
      createdByUser: {
        select: {
          email: true,
        },
      },
    },
  });

  return pages.map((page) => ({ ...page, isFavorite: true }));
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
  workspaceId?: Workspace['id']
) {
  const user = await getCurrentUser();
  if (!user || !workspaceId) {
    return;
  }

  const pagesPrivate = await db.page.findMany({
    where: {
      notebook: { workspaceId, teamspaceId: null },
      deletedAt: { not: null },
      createdBy: user.id,
    },
    select: {
      id: true,
      title: true,
      deletedAt: true,
      notebook: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });

  let pagesInTeamspace = await db.page.findMany({
    where: {
      notebook: { workspaceId, teamspaceId: { not: null } },
      deletedAt: { not: null },
    },
    include: {
      notebook: {
        select: {
          title: true,
          teamspace: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  pagesInTeamspace = pagesInTeamspace.map(p => ({
    ...p,
    url: `${p?.notebook?.teamspace?.name} / ${p.notebook.title}`,
  }));

  const pages = [...pagesPrivate, ...pagesInTeamspace];
  pages.sort((a, b) => new Date(b.deletedAt as Date).valueOf() - new Date(a.deletedAt as Date).valueOf());

  return { pages };
}

export async function getPage(pageId?: Page['id']) {
  const user = await getCurrentUser();

  const page = await db.page.findFirst({
    where: {
      id: pageId,
    },
    include: {
      favorites: {
        where: {
          userId: user?.id,
        },
      },
      notebook: true,
      createdByUser: {
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
      notebook: { workspaceId },
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
