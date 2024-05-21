'use server';

import { Notebook, Teamspace } from '@prisma/client';
import { db } from 'lib/db';
import { getCurrentUser } from '../session';

// get detail notebook + pages
export const getDetailNotebook = async (
  notebookId?: Notebook['id']
) => {
  const user = await getCurrentUser();

  const notebook = await db.notebook.findFirst({
    where: {
      id: notebookId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      pages: {
        where: {
          deletedAt: null,
        },
        select: {
          id: true,
          title: true,
          updatedAt: true,
          updatedBy: true,
          deletedAt: true,
          notebookId: true,
          content: true,
          createdByUser: {
            select: {
              email: true,
            },
          },
          favorites: {
            where: {
              userId: user?.id,
            },
          },
          // compute(page){
          //
          // }
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
      // published: true,
      createdAt: true,
    },
  });
  if (!notebook) return;

  return {
    ...notebook,
    pages: notebook.pages.map((page) => {
      return { ...page, isFavorite: page?.favorites && page.favorites.length > 0 };
    }),
  };
};

export const getNotebooksByTeamspace = async (
  teamspaceId?: Teamspace['id']
) => {
  return db.teamspace.findFirst({
    where: {
      id: teamspaceId as string,
    },
    select: {
      notebooks: true,
    },
  });
};
