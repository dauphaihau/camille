import * as z from "zod"

export const workspaceSchema = z.object({
  name: z.string().min(1, 'Required').max(32),
  // name: z.string().max(32),
  domain: z.string().min(3).max(32)
    .regex(new RegExp(/^(?!-+$)[a-z0-9-]+$/i), 'Domain invalid'),
})
