import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { authOptions } from 'lib/auth';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === 'GET') {
    try {
      let workspaces;
      workspaces = await db.workspace.findMany({
        where: {
          userOnWorkspace: {
            some: {
              user: { id: session.user.id },
            },
          },
        },
        include: {
          _count: {
            select: {
              userOnWorkspace: true,
            },
          },
        },
      });

      workspaces = workspaces.map((w) => ({
        name: w.name,
        domain: w.domain,
        id: w.id,
        isStandard: w.stripePriceId && w.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now(),
        totalMembers: w._count.userOnWorkspace,
      }));

      res.send({ code: '200', workspaces });
    } catch (error) {
      return res.status(500).end();
    }
  }
}

export default withMethods(['GET'], handler);
