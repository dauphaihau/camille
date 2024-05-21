import * as z from "zod"
import * as imports from "../null"
import { CompleteNotebook, relatedNotebookSchema, CompleteUser, relatedUserSchema, CompleteFavorite, relatedFavoriteSchema } from "./index"

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
  notebookId: z.string(),
  createdBy: z.string(),
  deletedBy: z.string().nullish(),
  updatedBy: z.string(),
})

export interface CompletePage extends z.infer<typeof pageSchema> {
  notebook: CompleteNotebook
  createdByUser: CompleteUser
  deletedByUser?: CompleteUser | null
  updatedByUser: CompleteUser
  favorites: CompleteFavorite[]
}

/**
 * relatedPageSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedPageSchema: z.ZodSchema<CompletePage> = z.lazy(() => pageSchema.extend({
  notebook: relatedNotebookSchema,
  createdByUser: relatedUserSchema,
  deletedByUser: relatedUserSchema.nullish(),
  updatedByUser: relatedUserSchema,
  favorites: relatedFavoriteSchema.array(),
}))
