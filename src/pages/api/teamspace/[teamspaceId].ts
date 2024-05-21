import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { authOptions } from 'lib/auth';
import { ARCHIVED_TEAMSPACE } from 'config/const';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === 'DELETE') {
    try {
      const { status } = req.body;

      switch (status) {
        case ARCHIVED_TEAMSPACE.SOFT_DELETE: {
          const teamspace = await db.teamspace.update({
            where: { id: req.query.teamspaceId as string },
            data: {
              // deletedBy: session.user.email,
              archivedAt: new Date(),
            },
            select: { name: true },
          });
          res.send({ code: '200', message: `Archived ${teamspace.name}` });
        }
          break;
        case ARCHIVED_TEAMSPACE.HARD_DELETE:
          await db.teamspace.delete({
            where: {
              id: req.query.teamspaceId as string,
            },
          });
          break;
        case ARCHIVED_TEAMSPACE.RECOVER:
          await db.teamspace.update({
            where: {
              id: req.query.teamspaceId as string,
            },
            data: {
              // deletedBy: null,
              archivedAt: null,
            },
          });
      }

      // res.end();
      res.send({ code: '200', message: 'OK' });
    } catch (error) {
      return res.status(500).end();
    }
  }
}
export default withMethods(['DELETE'], handler);
