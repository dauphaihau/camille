import * as z from "zod"
import * as imports from "../null"
import { CompleteUser, relatedUserSchema, CompleteTeamspace, relatedTeamspaceSchema } from "./index"

export const userOnTeamspaceSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  operation: z.number().int(),
  userId: z.string(),
  teamspaceId: z.string(),
})

export interface CompleteUserOnTeamspace extends z.infer<typeof userOnTeamspaceSchema> {
  user: CompleteUser
  teamspace: CompleteTeamspace
}

/**
 * relatedUserOnTeamspaceSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserOnTeamspaceSchema: z.ZodSchema<CompleteUserOnTeamspace> = z.lazy(() => userOnTeamspaceSchema.extend({
  user: relatedUserSchema,
  teamspace: relatedTeamspaceSchema,
}))
