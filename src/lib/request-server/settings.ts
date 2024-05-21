'use server';

import { cache } from 'react';
import { Workspace } from '@prisma/client';
import { db } from 'lib/db';

export const getListMembersByWorkspace = cache(async (domain?: Workspace['domain']) => {

  const workspace = await db.workspace.findFirst({
    where: { domain },
  });
  if (!workspace) return;

  return db.userOnWorkspace.findMany({
    where: {
      workspaceId: workspace.id,
    },
    select: {
      user: true,
      role: true,
    },
    orderBy: {
      role: 'asc',
    },
  });
});
