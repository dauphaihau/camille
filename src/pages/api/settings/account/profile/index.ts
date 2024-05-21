import { NextApiRequest, NextApiResponse } from 'next';
import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { db } from 'lib/db';
import { withMethods } from 'lib/api-middlewares/with-methods';
import { RequiresStandardPlanError } from 'lib/exceptions';
import { authOptions } from 'lib/auth';
import { updateProfileSchema } from 'lib/validations/user';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  if (req.method === 'PATCH') {
    try {
      const body = updateProfileSchema.parse(req.body);

      await db.user.update({
        where: { id: session.user.id },
        data: {
          name: body.name,
        },
      });

      return res.send({ code: '200', message: 'Update profile success' });
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

export default withMethods(['PATCH'], handler);
