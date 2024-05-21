import * as z from "zod"
import * as imports from "../null"
import { CompleteAccount, relatedAccountSchema, CompleteSession, relatedSessionSchema, CompleteUserOnWorkspace, relatedUserOnWorkspaceSchema, CompleteUserOnTeamspace, relatedUserOnTeamspaceSchema, CompleteTrackingUserAccessOnWorkspace, relatedTrackingUserAccessOnWorkspaceSchema, CompleteFavorite, relatedFavoriteSchema, CompleteNotebook, relatedNotebookSchema, CompletePage, relatedPageSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
  createdAt: z.date(),
  updatedAt: z.date(),
  stripeCustomerId: z.string().nullish(),
  lastAccessWorkspaceId: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  userOnWorkspace: CompleteUserOnWorkspace[]
  userOnTeamspace: CompleteUserOnTeamspace[]
  trackingUserAccess: CompleteTrackingUserAccessOnWorkspace[]
  favorites: CompleteFavorite[]
  notebooks: CompleteNotebook[]
  PagesCreated: CompletePage[]
  PagesUpdated: CompletePage[]
  PagesDeleted: CompletePage[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  accounts: relatedAccountSchema.array(),
  sessions: relatedSessionSchema.array(),
  userOnWorkspace: relatedUserOnWorkspaceSchema.array(),
  userOnTeamspace: relatedUserOnTeamspaceSchema.array(),
  trackingUserAccess: relatedTrackingUserAccessOnWorkspaceSchema.array(),
  favorites: relatedFavoriteSchema.array(),
  notebooks: relatedNotebookSchema.array(),
  PagesCreated: relatedPageSchema.array(),
  PagesUpdated: relatedPageSchema.array(),
  PagesDeleted: relatedPageSchema.array(),
}))
