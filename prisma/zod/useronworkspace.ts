import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, relatedUserSchema, CompleteWorkspace, relatedWorkspaceSchema } from "./index"

export const userOnWorkspaceSchema = z.object({
  id: z.string(),
  role: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  workspaceId: z.string(),
})

export interface CompleteUserOnWorkspace extends z.infer<typeof userOnWorkspaceSchema> {
  user: CompleteUser
  workspace: CompleteWorkspace
}

/**
 * relatedUserOnWorkspaceSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserOnWorkspaceSchema: z.ZodSchema<CompleteUserOnWorkspace> = z.lazy(() => userOnWorkspaceSchema.extend({
  user: relatedUserSchema,
  workspace: relatedWorkspaceSchema,
}))
