import { NextApiRequest, NextApiResponse } from 'next'
import * as z from 'zod'
import { getServerSession } from 'next-auth/next';

import { withMethods } from 'lib/api-middlewares/with-methods'
import { db } from 'lib/db'
import { authOptions } from 'lib/auth';
import { RequiresStandardPlanError } from "lib/exceptions";

const favoriteSchema = z.object({
  pageId: z.string(),
  workspaceId: z.string(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {

  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  // add or remove page favorite
  if (req.method === "POST") {
    try {
      const body = favoriteSchema.parse(req.body)

      const favorite = await db.favorite.findFirst({
        where: {
          userId: session.user.id,
          pageId: body.pageId,
          workspaceId: body.workspaceId
        }
      })

      if (favorite) {
        await db.favorite.delete({
          where: { id: favorite.id }
        })
        return res.send({ code: '200', message: 'remove page from favorites success' })
      } else {
        await db.favorite.create({
          data: {
            user: {
              connect: { id: session.user.id }
            },
            workspace: {
              connect: { id: body.workspaceId }
            },
            page: {
              connect: { id: body.pageId }
            }
          },
        })
        return res.send({ code: '200', message: 'add page into favorites success' })
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresStandardPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }
}

export default withMethods(['POST'], handler)
