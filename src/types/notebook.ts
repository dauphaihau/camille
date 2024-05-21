import { z } from 'zod';
import { createNotebookSchema, createNotebookTsSchema, updateNotebookSchema } from 'lib/validations/notebook';

export type ICreateNotebook = z.infer<typeof createNotebookSchema>;

export type IUpdateNotebook = z.infer<typeof updateNotebookSchema>;

export type ICreateNotebookTs = z.infer<typeof createNotebookTsSchema>;
