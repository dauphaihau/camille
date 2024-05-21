import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { RequiresStandardPlanError } from 'lib/exceptions';
import { authOptions } from 'lib/auth';
import { createPageSchema } from 'lib/validations/page';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  // create page
  if (req.method === 'POST') {
    try {
      const body = createPageSchema.parse(req.body);

      if (!body.notebookId) {
        return res.status(400);
      }

      const page = await db.page.create({
        data: {
          notebookId: body.notebookId,
          title: body?.title ?? '',
          content: body?.content ?? '',
          updatedBy: session.user.id,
          createdBy: session.user.id,
        },
        select: {
          id: true,
        },
      });

      res.send({
        code: '200',
        message: 'create page success',
        data: {
          pageId: page.id,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      if (error instanceof RequiresStandardPlanError) {
        return res.status(402).end();
      }

      return res.status(500).end();
    }
  }
}

export default withMethods(['POST'], handler);
