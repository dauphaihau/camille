import * as z from "zod"
import * as imports from "../null"
import { CompletePage, relatedPageSchema, CompleteWorkspace, relatedWorkspaceSchema, CompleteTeamspace, relatedTeamspaceSchema, CompleteUser, relatedUserSchema } from "./index"

export const notebookSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullish(),
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  workspaceId: z.string(),
  teamspaceId: z.string().nullish(),
  createdBy: z.string(),
})

export interface CompleteNotebook extends z.infer<typeof notebookSchema> {
  pages: CompletePage[]
  workspace: CompleteWorkspace
  teamspace?: CompleteTeamspace | null
  user: CompleteUser
}

/**
 * relatedNotebookSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedNotebookSchema: z.ZodSchema<CompleteNotebook> = z.lazy(() => notebookSchema.extend({
  pages: relatedPageSchema.array(),
  workspace: relatedWorkspaceSchema,
  teamspace: relatedTeamspaceSchema.nullish(),
  user: relatedUserSchema,
}))
