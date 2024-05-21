import * as z from 'zod';

import { db } from 'lib/db';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const schema = z.object({
  notebookId: z.string(),
});

export function withNotebook(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      const query = await schema.parse(req.query);

      // Check if the user has access to this page.
      // const session = await getServerSession(req, res, authOptions);

      const count = await db.notebook.count({
        where: {
          id: query.notebookId,
          // authorId: session.user.id,
        },
      });

      if (count < 1) {
        return res.status(403).end();
      }

      return handler(req, res);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(500).end();
    }
  };
}
