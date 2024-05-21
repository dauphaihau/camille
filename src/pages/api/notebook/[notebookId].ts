import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { authOptions } from 'lib/auth';
import { updateNotebookSchema } from 'lib/validations/notebook';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === 'DELETE') {
    try {
      await db.notebook.delete({
        where: {
          id: req.query.notebookId as string,
        },
      });
      return res.send({ code: '200', message: 'delete notebook success' });
      // return res.status(204).end()
    } catch (error) {
      return res.status(500).end();
    }
  }

  if (req.method === 'PATCH') {
    try {
      const notebookId = req.query.notebookId;

      if (typeof notebookId != 'string') {
        return res.status(400).end();
      }

      const notebook = await db.notebook.findUnique({
        where: { id: notebookId },
      });

      if (!notebook) {
        return res.status(404).end();
      }

      const body = updateNotebookSchema.parse(req.body);

      await db.notebook.update({
        where: {
          id: notebook.id,
        },
        data: {
          title: body.title,
          description: body.description || notebook.description,
        },
      });

      return res.send({ code: '200', message: 'update page success' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }
      return res.status(422).end();
    }
  }
}

export default withMethods(['DELETE', 'PATCH'], handler);
