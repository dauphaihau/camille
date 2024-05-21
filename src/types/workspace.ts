import { z } from 'zod';
import { Prisma, Workspace } from '@prisma/client';
import { getDetailWorkspace } from 'lib/request-server/workspace';
import { createWorkspaceSchema, updateWorkspaceSchema } from 'lib/validations/workspace';

import { Response } from 'types';

export type IGetDetailWorkspace = Prisma.PromiseReturnType<typeof getDetailWorkspace>

export type IResponseDeleteWorkspace = Pick<Workspace, 'domain'> & Response

export type ICreateWorkspace = z.infer<typeof createWorkspaceSchema>;

export type IUpdateWorkspace = z.infer<typeof updateWorkspaceSchema>;

export interface DashboardSlugs {
  [key: string]: string
  domainWorkspace: string
  notebookId: string
  pageId: string
}
