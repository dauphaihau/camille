import { notebookSchema } from '../../prisma/zod';

export const createNotebookSchema = notebookSchema.pick({
  workspaceId: true,
  title: true,
  description: true,
});

export const updateNotebookSchema = notebookSchema.pick({
  // id: true,
}).merge(notebookSchema.pick({
  title: true,
  description: true,
}).partial());

export const createNotebookTsSchema = notebookSchema.pick({
  workspaceId: true,
  teamspaceId: true,
  title: true,
  description: true,
});
