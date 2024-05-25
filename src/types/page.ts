import { z } from 'zod';
import {
  addPageToFavoriteSchema, createPageSchema, deletePageSchema, updatePageSchema
} from '../validations/page';

// type PagePrivate = Prisma.PageGetPayload<typeof selectPagesPrivate>

export type IAddPageToFavorite = z.infer<typeof addPageToFavoriteSchema>;

export type IUpdatePage = z.infer<typeof updatePageSchema>;

export type ICreatePage = z.infer<typeof createPageSchema>;

export type IDeletePage = z.infer<typeof deletePageSchema>;
