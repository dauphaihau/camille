import { z } from 'zod';
import { createTeamspaceSchema } from 'lib/validations/teamspace';
import { ARCHIVED_TEAMSPACE } from 'config/const';

export type ICreateTeamspace = z.infer<typeof createTeamspaceSchema>;

export type IArchiveTeamspace = {
  status: ARCHIVED_TEAMSPACE
}
