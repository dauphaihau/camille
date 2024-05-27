import * as z from "zod"
import { CompleteWorkspace, relatedWorkspaceSchema, CompleteUserOnTeamspace, relatedUserOnTeamspaceSchema, CompletePage, relatedPageSchema } from "./index"

export const teamspaceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isOrigin: z.boolean().nullish(),
  archivedAt: z.date().nullish(),
  workspaceId: z.string().nullish(),
  createdBy: z.string(),
})

export interface CompleteTeamspace extends z.infer<typeof teamspaceSchema> {
  workspace?: CompleteWorkspace | null
  userOnTeamspace: CompleteUserOnTeamspace[]
  pages: CompletePage[]
}

/**
 * relatedTeamspaceSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedTeamspaceSchema: z.ZodSchema<CompleteTeamspace> = z.lazy(() => teamspaceSchema.extend({
  workspace: relatedWorkspaceSchema.nullish(),
  userOnTeamspace: relatedUserOnTeamspaceSchema.array(),
  pages: relatedPageSchema.array(),
}))
