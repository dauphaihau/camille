import { getServerSession } from 'next-auth/next';

import { authOptions } from 'lib/auth';
import { db } from 'lib/db';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export function withPermission(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).end();
    }

    const userRequest = await db.userOnWorkspace.findFirst({
      where: {
        AND: [
          { userId: { equals: session.user.id } },
          { workspaceId: { equals: req.body.workspaceId || req.query.workspaceId } },
        ],
      },
    });

    if (!userRequest || userRequest.role === ROLE_USER_ON_WORKSPACE.MEMBER) {
      return res.status(403).send({ code: '403', message: 'You don\'t have permission to perform this action' });
    }

    return handler(req, res);
  };
}
