import { z } from 'zod';
import { Page } from '@prisma/client';
// import { selectPagesPrivate } from 'lib/request-server/page';
import { addPageToFavoriteSchema, createPageSchema, updatePageSchema } from '../lib/validations/page';
import { DELETE_PAGE_TYPE } from '../config/const';

// type PagePrivate = Prisma.PageGetPayload<typeof selectPagesPrivate>

export type IAddPageToFavorite = z.infer<typeof addPageToFavoriteSchema>;

export type IUpdatePage = z.infer<typeof updatePageSchema>;

export type ICreatePage = z.infer<typeof createPageSchema>;

export type IDeletePage = {
  pageId: Page['id']
  type: DELETE_PAGE_TYPE
}
