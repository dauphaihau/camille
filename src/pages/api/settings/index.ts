import { NextApiRequest, NextApiResponse } from 'next';
// import * as z from 'zod';
import { getServerSession } from 'next-auth/next';

import { withMethods } from 'lib/api-middlewares/with-methods';
// import { db } from 'lib/db';
// import { RequiresStandardPlanError } from 'lib/exceptions';
import { authOptions } from 'lib/auth';

// const settingsUpdateSchema = z.object({
//   name: z.string().optional(),
//   domain: z.string().optional(),
// });

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(403).end();
  }

  // const { user } = session;

  // if (req.method === 'GET') {
  //   try {
  //     const notebooks = await db.notebook.findMany({
  //       select: {
  //         id: true,
  //         title: true,
  //         published: true,
  //         createdAt: true,
  //       },
  //       where: {
  //         authorId: user.id,
  //       },
  //     })
  //
  //     const dbUser = await db.user.findFirst({
  //       where: {
  //         email: 'hautran.job@outlook.com',
  //       },
  //     });
  //
  //     const domain = await db.domain.findFirst({
  //       select: {
  //         name: true,
  //       },
  //       where: {
  //         ownerId: user.id,
  //       },
  //     });
  //
  //     return res.json(domain);
  //   } catch (error) {
  //     return res.status(500).end();
  //   }
  // }

  // if (req.method === 'POST') {
  //   try {
  //     const body = settingsUpdateSchema.parse(req.body);
  //
  //     const domainExist = !!await db.domain.findFirst({
  //       where: {
  //         name: body.domain,
  //       },
  //     });
  //
  //     if (domainExist) {
  //       return res.status(409).send({ code: '409', message: 'That domain is taken' });
  //     }
  //
  //     const domain = await db.domain.create({
  //       data: {
  //         ownerId: session.user.id,
  //         name: body.domain,
  //       },
  //       select: {
  //         id: true,
  //       },
  //     });
  //
  //
  //     // return res.status(200)
  //     // return res.json(notebook)
  //     return res.json(domain);
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       return res.status(422).json(error.issues);
  //     }
  //
  //     if (error instanceof RequiresStandardPlanError) {
  //       return res.status(402).end();
  //     }
  //
  //     return res.status(500).end();
  //   }
  // }

  // if (req.method === 'PATCH') {
  //   try {
  //     const body = settingsUpdateSchema.parse(req.body);
  //     if (body?.domain) {
  //
  //       const domainExist = !!await db.domain.findFirst({
  //         where: {
  //           name: body.domain,
  //         },
  //       });
  //
  //       if (domainExist) {
  //         return res.status(409).send({ code: '409', message: 'That domain is taken' });
  //       }
  //
  //       await db.domain.update({
  //         where: {
  //           ownerId: user.id,
  //         },
  //         data: {
  //           name: body.domain,
  //         },
  //       });
  //     }
  //
  //     return res.end();
  //   } catch (error) {
  //     if (error instanceof z.ZodError) {
  //       return res.status(422).json(error.issues);
  //     }
  //
  //     if (error instanceof RequiresStandardPlanError) {
  //       return res.status(402).end();
  //     }
  //
  //     return res.status(500).end();
  //   }
  // }

}

export default withMethods(['PATCH', 'GET', 'POST'], handler);
