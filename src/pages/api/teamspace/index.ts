import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { RequiresStandardPlanError } from 'lib/exceptions';
import { authOptions } from 'lib/auth';
import { createTeamspaceSchema } from 'lib/validations/teamspace';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  // create teamspace
  if (req.method === 'POST') {
    try {
      const body = createTeamspaceSchema.parse(req.body);

      await db.teamspace.create({
        data: {
          workspaceId: body.workspaceId,
          name: body.name,
          createdBy: session.user.email as string,
          description: body.description ?? '',
        },
      });

      return res.send({ code: '200', message: 'create teamspace success' });
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

export default withMethods(['POST'], handler);
