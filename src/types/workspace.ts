import { z } from 'zod';
import { Prisma } from '@prisma/client';
import { getDetailWorkspace } from 'services/server-actions/workspace';
import { createWorkspaceSchema, updateWorkspaceSchema } from 'validations/workspace';
import { getWorkspaceSubscriptionPlan } from 'services/server-actions/subscription';

export type IGetWorkspaceSubscriptionPlan = Prisma.PromiseReturnType<typeof getWorkspaceSubscriptionPlan>

export type IGetDetailWorkspace = Prisma.PromiseReturnType<typeof getDetailWorkspace>

export type ICreateWorkspace = z.infer<typeof createWorkspaceSchema>;

export type IUpdateWorkspace = z.infer<typeof updateWorkspaceSchema>;

export interface DashboardSlugs {
  [key: string]: string
  domainWorkspace: string
  pageId: string
}
