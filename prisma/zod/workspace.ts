import * as z from "zod"
import * as imports from "../null"
import { CompleteTrackingUserAccessOnWorkspace, relatedTrackingUserAccessOnWorkspaceSchema, CompleteUserOnWorkspace, relatedUserOnWorkspaceSchema, CompleteTeamspace, relatedTeamspaceSchema, CompleteNotebook, relatedNotebookSchema, CompleteFavorite, relatedFavoriteSchema } from "./index"

export const workspaceSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name must be 3 to 32 characters').max(32, 'Name must be 3 to 32 characters'),
  domain: z.string().min(3, { message: "Domain must be 3 to 32 characters" }).regex(new RegExp(/^(?!-+$)[a-z0-9-]+$/i), 'Domain invalid').max(32, 'Domain must be 3 to 32 characters'),
  stripeCustomerId: z.string().nullish(),
  stripeWorkspaceId: z.string().nullish(),
  stripeSubscriptionId: z.string().nullish(),
  stripePriceId: z.string().nullish(),
  stripeCurrentPeriodEnd: z.date().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  createdBy: z.string(),
})

export interface CompleteWorkspace extends z.infer<typeof workspaceSchema> {
  trackingUserAccessOnWorkspace?: CompleteTrackingUserAccessOnWorkspace | null
  userOnWorkspace: CompleteUserOnWorkspace[]
  teamspaces: CompleteTeamspace[]
  notebooks: CompleteNotebook[]
  favorites: CompleteFavorite[]
}

/**
 * relatedWorkspaceSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedWorkspaceSchema: z.ZodSchema<CompleteWorkspace> = z.lazy(() => workspaceSchema.extend({
  trackingUserAccessOnWorkspace: relatedTrackingUserAccessOnWorkspaceSchema.nullish(),
  userOnWorkspace: relatedUserOnWorkspaceSchema.array(),
  teamspaces: relatedTeamspaceSchema.array(),
  notebooks: relatedNotebookSchema.array(),
  favorites: relatedFavoriteSchema.array(),
}))
