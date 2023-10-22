import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { RequiresStandardPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"
import { ROLE_USER_ON_WORKSPACE } from "config/const";

const removeMemberSchema = z.object({
  workspaceId: z.string(),
  userId: z.string()
})

const addMemberSchema = z.object({
  workspaceId: z.string(),
  email: z.string()
})

const updateProfileSchema = z.object({
  name: z.string()
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  if (req.method === "DELETE") {
    try {
      const body = removeMemberSchema.parse(req.body)

      const record = await db.userOnWorkspace.findFirst({
        where: {
          AND: [
            { userId: { equals: body.userId } },
            { workspaceId: { equals: body.workspaceId } }
          ]
        },
      })

      if (record) {
        await db.userOnWorkspace.delete({
          where: { id: record.id }
        })
      }

      // user leave workspace
      if (body.userId === session.user.id) {
        const workspace = await db.userOnWorkspace.findFirst({
          where: { userId: body.userId },
          select: { workspace: { select: { domain: true } } }
        })
        return res.send({
          code: '200',
          message: 'Remove member success',
          data: workspace
          // redirectToDomain: workspace && workspace.domain
        })
      }

      return res.send({ code: '200', message: 'Remove member success' })
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

  if (req.method === "PATCH") {
    try {
      const body = updateProfileSchema.parse(req.body)

      await db.user.update({
        where: { id: session.user.id },
        data: {
          name: body.name
        }
      })

      return res.send({ code: '200', message: 'Update profile success' })
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

export default withMethods(["PATCH", "POST", 'DELETE'], handler)
