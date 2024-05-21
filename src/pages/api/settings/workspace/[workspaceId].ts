import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { RequiresStandardPlanError } from 'lib/exceptions';
import { authOptions } from 'lib/auth';
import { withPermission } from 'lib/api-middlewares/with-permission';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  // delete workspace
  if (req.method === 'DELETE') {
    try {
      const deleteTracks = db.trackingUserAccessOnWorkspace.deleteMany({
        where: {
          workspaceId: req.query.workspaceId as string,
        },
      });

      const deleteNotebooks = db.notebook.deleteMany({
        where: {
          workspaceId: req.query.workspaceId as string,
        },
      });

      const deleteWorkspace = db.workspace.delete({
        where: {
          id: req.query.workspaceId as string,
        },
      });

      await db.$transaction([deleteTracks, deleteNotebooks, deleteWorkspace]);
      // const transaction = await db.$transaction([deleteTracks, deleteNotebooks, deleteWorkspace]);

      // res.end()

      // redirect to another domain workspace

      const userOnWorkspace = await db.userOnWorkspace.findFirst({
        where: { userId: session.user.id },
        select: {
          workspace: {
            select: { domain: true },
          },
        },
      });
      res.send({
        code: '200',
        message: 'Delete workspace successfully',
        domain: userOnWorkspace?.workspace.domain ?? '',
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

export default withMethods(['DELETE'], withPermission(handler));
