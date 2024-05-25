import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, relatedUserSchema, CompleteWorkspace, relatedWorkspaceSchema } from "./index"

export const trackingUserAccessOnWorkspaceSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  lastAccessPageId: z.string().nullish(),
  userId: z.string(),
  workspaceId: z.string(),
})

export interface CompleteTrackingUserAccessOnWorkspace extends z.infer<typeof trackingUserAccessOnWorkspaceSchema> {
  user: CompleteUser
  workspace: CompleteWorkspace
}

/**
 * relatedTrackingUserAccessOnWorkspaceSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedTrackingUserAccessOnWorkspaceSchema: z.ZodSchema<CompleteTrackingUserAccessOnWorkspace> = z.lazy(() => trackingUserAccessOnWorkspaceSchema.extend({
  user: relatedUserSchema,
  workspace: relatedWorkspaceSchema,
}))
