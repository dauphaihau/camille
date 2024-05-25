import { z } from 'zod';
import { createTeamspaceSchema } from 'validations/teamspace';

export type ICreateTeamspace = z.infer<typeof createTeamspaceSchema>;
