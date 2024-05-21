import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { withMethods } from 'lib/api-middlewares/with-methods';
import { db } from 'lib/db';
import { authOptions } from 'lib/auth';
import { DELETE_PAGE_TYPE } from 'config/const';

const deletePageSchema = z.object({
  pageId: z.string(),
  type: z.nativeEnum(DELETE_PAGE_TYPE),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(403).end();
  }

  // delete page by status
  if (req.method === 'POST') {
    try {
      const body = deletePageSchema.parse(req.body);

      switch (body.type) {
        case DELETE_PAGE_TYPE.SOFT_DELETE:
          await db.page.update({
            where: {
              id: body.pageId,
            },
            data: {
              deletedBy: session.user.id,
              deletedAt: new Date(),
            },
          });
          break;
        case DELETE_PAGE_TYPE.HARD_DELETE:
          await db.page.delete({
            where: { id: body.pageId },
          });
          break;
        case DELETE_PAGE_TYPE.RECOVER:
          await db.page.update({
            where: {
              id: body.pageId,
            },
            data: {
              deletedBy: null,
              deletedAt: null,
            },
          });
      }

      return res.send({ code: '200', message: 'Ok' });
    } catch (error) {
      return res.status(500).end();
    }
  }

}

export default withMethods(['POST'], handler);
