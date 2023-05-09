import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { RequiresStandardPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"

const workspacePathSchema = z.object({
  lastAccessWorkspaceId: z.string().optional(),
  lastAccessNotebookId: z.string().optional(),
  lastAccessPageId: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  if (req.method === "POST") {
    try {
      const body = JSON.parse(req.body)

      // const data = await db.trackingUserAccessOnWorkspace.findFirstOrThrow({
      const data = await db.trackingUserAccessOnWorkspace.findFirst({
        where: {
          AND: [
            { userId: session.user.id },
            { workspaceId: body.workspaceId },
          ]
        }
      })

      if (!data) {
        return res.send({ code: '200', message: 'success' })
      }
      return res.send({ code: '200', message: 'success', data })
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "PATCH") {
    try {
      const body = workspacePathSchema.parse(req.body)
      const userId = req.query.userId as string

      await db.user.update({
        where: { id: userId },
        data: { lastAccessWorkspaceId: body.lastAccessWorkspaceId, }
      })

      const isTrackingUserAccessExist = await db.trackingUserAccessOnWorkspace.findFirst({
        where: {
          AND: [
            { userId },
            { workspaceId: body.lastAccessWorkspaceId },
          ]
        }
      })

      if (isTrackingUserAccessExist) {
        await db.trackingUserAccessOnWorkspace.update({
          where: { id: isTrackingUserAccessExist.id },
          data: {
            lastAccessNotebookId: body.lastAccessNotebookId,
            lastAccessPageId: body.lastAccessPageId ?? '',
          }
        })
      } else {
        await db.trackingUserAccessOnWorkspace.create({
          data: {
            user: {
              connect: { id: userId }
            },
            workspace: {
              connect: { id: body.lastAccessWorkspaceId }
            },
            lastAccessNotebookId: body.lastAccessNotebookId,
            lastAccessPageId: body.lastAccessPageId ?? '',
          }
        })
      }
      return res.end()
    } catch (error) {
      console.log('dauphaihau debug: error', error)
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

export default withMethods(["PATCH", "POST"], handler)
