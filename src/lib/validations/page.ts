import * as z from "zod"

export const pagePatchSchema = z.object({
  title: z.string().max(128).optional(),
  // title: z.string().min(3).max(128).optional(),

  // TODO: Type this properly from editorjs block types?
  content: z.any().optional(),
})
