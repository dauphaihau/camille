import { teamspaceSchema } from '../../../prisma/zod';

export const createTeamspaceSchema = teamspaceSchema.pick({
  workspaceId: true,
  name: true,
  description: true,
});
