import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { getWorkspaceSubscriptionPlan } from 'lib/request-server/subscription';
import { RequiresStandardPlanError } from 'lib/exceptions';
import { authOptions } from 'lib/auth';
import { freePlan } from 'config/subscriptions';
import { withPlan } from 'lib/api-middlewares/with-plan';
import { createNotebookSchema } from 'lib/validations/notebook';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  // create notebook
  if (req.method === 'POST') {
    try {
      const body = createNotebookSchema.parse(req.body);

      const subscriptionPlan = await getWorkspaceSubscriptionPlan(body.workspaceId);
      if (!subscriptionPlan?.isStandard) {
        const totalMembers = await db.userOnWorkspace.count({
          where: { workspaceId: body.workspaceId },
        });

        if (totalMembers > 1) {
          const total = await db.notebook.count({
            where: { workspace: { id: body.workspaceId } },
          });

          if (total >= freePlan.limitedNotebooks) {
            throw new RequiresStandardPlanError();
          }
        }
      }

      await db.notebook.create({
        data: {
          workspaceId: body.workspaceId,
          createdBy: session.user.id,
          title: body.title,
          description: body.description,
        },
      });

      return res.send({ code: '200', message: 'create notebook success' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      if (error instanceof RequiresStandardPlanError) {
        return res.status(402).send({
          code: '402', message: 'This action requires a pro plan',
        });
      }
      return res.status(500).end();
    }
  }
}

export default withMethods(['POST'], withPlan(handler));
