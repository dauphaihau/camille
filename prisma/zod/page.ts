import * as z from "zod"
import * as imports from "../null"
import { CompleteWorkspace, relatedWorkspaceSchema, CompleteTeamspace, relatedTeamspaceSchema, CompleteUser, relatedUserSchema, CompleteFavorite, relatedFavoriteSchema } from "./index"

// Helper schema for JSON fields
type Literal = boolean | number | string
type Json = Literal | { [key: string]: Json } | Json[]
const literalSchema = z.union([z.string(), z.number(), z.boolean()])
const jsonSchema: z.ZodSchema<Json> = z.lazy(() => z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)]))

export const pageSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: jsonSchema,
  published: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullish(),
  workspaceId: z.string(),
  teamspaceId: z.string().nullish(),
  createdBy: z.string(),
  updatedBy: z.string(),
  deletedBy: z.string().nullish(),
})

export interface CompletePage extends z.infer<typeof pageSchema> {
  workspace: CompleteWorkspace
  teamspace?: CompleteTeamspace | null
  createdByUser: CompleteUser
  updatedByUser: CompleteUser
  deletedByUser?: CompleteUser | null
  favorites: CompleteFavorite[]
}

/**
 * relatedPageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPageSchema: z.ZodSchema<CompletePage> = z.lazy(() => pageSchema.extend({
  workspace: relatedWorkspaceSchema,
  teamspace: relatedTeamspaceSchema.nullish(),
  createdByUser: relatedUserSchema,
  updatedByUser: relatedUserSchema,
  deletedByUser: relatedUserSchema.nullish(),
  favorites: relatedFavoriteSchema.array(),
}))
