import * as z from "zod"
import { CompleteUser, relatedUserSchema, CompleteWorkspace, relatedWorkspaceSchema, CompletePage, relatedPageSchema } from "./index"

export const favoriteSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
  workspaceId: z.string(),
  pageId: z.string(),
})

export interface CompleteFavorite extends z.infer<typeof favoriteSchema> {
  user: CompleteUser
  workspace?: CompleteWorkspace | null
  page?: CompletePage | null
}

/**
 * relatedFavoriteSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedFavoriteSchema: z.ZodSchema<CompleteFavorite> = z.lazy(() => favoriteSchema.extend({
  user: relatedUserSchema,
  workspace: relatedWorkspaceSchema.nullish(),
  page: relatedPageSchema.nullish(),
}))
