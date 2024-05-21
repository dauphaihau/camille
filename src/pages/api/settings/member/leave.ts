import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { RequiresStandardPlanError } from 'lib/exceptions';
import { authOptions } from 'lib/auth';
import { ROLE_USER_ON_WORKSPACE } from 'config/const';

const memberLeaveSchema = z.object({
  workspaceId: z.string(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === 'POST') {
    try {
      const body = memberLeaveSchema.parse(req.body);

      const userOnWs = await db.userOnWorkspace.findFirst({
        where: {
          AND: [
            { userId: { equals: session.user.id } },
            { workspaceId: { equals: body.workspaceId } },
          ],
        },
      });

      if (userOnWs) {
        await db.userOnWorkspace.delete({
          where: { id: userOnWs.id },
        });
      }

      await db.userOnTeamspace.deleteMany({
        where: {
          AND: [
            { userId: { equals: session.user.id } },
            {
              teamspace: {
                workspaceId: {
                  equals: body.workspaceId,
                },
              },
            },
          ],
        },
      });

      // case user leave
      // if session.user.id === session.user.id) {
      const totalUsers = await db.userOnWorkspace.findMany({
        where: { workspaceId: body.workspaceId, userId: { not: session.user.id } },
        select: {
          id: true, userId: true, createdAt: true, role: true, 
        },
      });

      // grant admin rights to last user
      if (totalUsers.length === 1) {
        const userOnWorkspace = totalUsers[0];
        await db.userOnWorkspace.update({
          where: { id: userOnWorkspace.id },
          data: { role: ROLE_USER_ON_WORKSPACE.ADMIN },
        });
      }

      if (totalUsers.length > 1) {
        const isStillHaveAdmin = totalUsers.some((o) => o.role === ROLE_USER_ON_WORKSPACE.ADMIN);

        // grant admin rights to last user by createdAt
        if (!isStillHaveAdmin) {
          await db.userOnWorkspace.update({
            where: { id: totalUsers[0].id },
            data: { role: ROLE_USER_ON_WORKSPACE.ADMIN },
          });
        }
      }

      // get domain to redirect another workspace when user leave
      const workspace = await db.userOnWorkspace.findFirst({
        where: { userId: session.user.id },
        select: { workspace: { select: { domain: true } } },
      });
      return res.send({
        code: '200',
        message: 'success',
        data: workspace,
        // redirectToDomain: workspace && workspace.domain
      });

      // return res.send({ code: '200', message: 'Remove member success' })
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
