import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { withMethods } from 'lib/api-middlewares/with-methods';
import { db } from 'lib/db';
import { updatePageSchema } from 'lib/validations/page';
import { authOptions } from 'lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  // update page
  if (req.method === 'PATCH') {
    try {
      const pageId = req.query.pageId;

      if (typeof pageId != 'string') {
        return res.status(400).end();
      }

      const page = await db.page.findUnique({
        where: {
          id: pageId,
        },
      });

      if (!page) {
        return res.status(404).end();
      }

      const body = updatePageSchema.parse(req.body);

      if (body?.title && !body.title) {
        body.title = 'Untitled page';
      }

      await db.page.update({
        where: {
          id: page.id,
        },
        data: {
          ...body,
          updatedBy: session.user.id,
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

export default withMethods(['PATCH'], handler);
