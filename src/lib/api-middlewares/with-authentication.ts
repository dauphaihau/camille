import { getServerSession } from 'next-auth/next';

import { authOptions } from 'lib/auth';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export function withAuthentication(handler: NextApiHandler) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      return res.status(403).end();
    }

    return handler(req, res);
  };
}
