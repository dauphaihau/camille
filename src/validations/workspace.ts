import * as z from 'zod';
import { workspaceSchema } from '../../prisma/zod';

export const createWorkspaceSchema = workspaceSchema.pick({
  name: true,
  domain: true,
});

export const updateWorkspaceSchema = workspaceSchema.pick({
  name: true,
  domain: true,
}).partial()
  .merge(
    z.object({
      workspaceId: workspaceSchema.shape.id,
    })
  );
