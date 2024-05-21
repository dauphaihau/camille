import * as z from 'zod';
import { pageSchema, workspaceSchema } from '../../../prisma/zod';

const customPageSchema = pageSchema.merge(z.object({
  content: z.any().optional(),
}));

export const addPageToFavoriteSchema = z.object({
  pageId: pageSchema.shape.id,
  workspaceId: workspaceSchema.shape.id,
});

export const updatePageSchema = customPageSchema.pick({
  title: true,
  content: true,
  published: true,
}).partial();

export const createPageSchema = customPageSchema.pick({
  notebookId: true,
}).merge(customPageSchema.pick({
  title: true,
  content: true,
})).partial();
