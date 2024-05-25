import * as z from 'zod';
import { DELETE_PAGE_TYPE } from 'config/const';
import { pageSchema, workspaceSchema } from '../../prisma/zod';

const customPageSchema = pageSchema.merge(z.object({
  content: z.any().optional(),
}));

export const addPageToFavoriteSchema = z.object({
  pageId: pageSchema.shape.id,
  workspaceId: workspaceSchema.shape.id,
});

export const deletePageSchema = z.object({
  workspaceId: workspaceSchema.shape.id,
  pageId: pageSchema.shape.id,
  type: z.nativeEnum(DELETE_PAGE_TYPE),
});

export const updatePageSchema = customPageSchema.pick({
  id: true,
}).merge(customPageSchema.pick({
  title: true,
  content: true,
  published: true,
}).partial());

export const createPageSchema = customPageSchema.pick({
  workspaceId: true,
}).merge(customPageSchema.pick({
  teamspaceId: true,
  title: true,
  content: true,
}).partial());
