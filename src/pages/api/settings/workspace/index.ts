import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { RequiresStandardPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"
import { omitFieldNullish } from "core/helpers";
import { ROLE_USER_ON_WORKSPACE } from "config/const";

const workspaceUpdateSchema = z.object({
  workspaceId: z.string(),
  name: z.string().optional(),
  domain: z.string().optional(),
})

const workspaceCreateSchema = z.object({
  name: z.string(),
  domain: z.string(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  // create workspace
  if (req.method === "POST") {
    try {
      const body = workspaceCreateSchema.parse(req.body)

      const isDomainExist = !!await db.workspace.findFirst({
        where: {
          domain: body.domain
        }
      })

      if (isDomainExist) {
        return res.status(409).send({ code: '409', message: `That domain is taken` });
      }

      const newWorkspace = await db.workspace.create({
        data: {
          domain: body.domain,
          name: body.name,
          createdBy: session.user.id
        }
      })

      await db.userOnWorkspace.create({
        data: {
          user: {
            connect: { id: session.user.id }
          },
          workspace: {
            connect: { id: newWorkspace.id }
          },
        },
      })

      await db.notebook.create({
        data: {
          workspaceId: newWorkspace.id,
          createdBy: session.user.id,
          title: 'Untitled notebook',
        },
      })
      return res.send({ code: '200', message: 'create workspace successfully' })
      // return res.end()
    } catch (error) {
      // console.log('dauphaihau debug: error', error)
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresStandardPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }

  // update name, domain workspace
  if (req.method === "PATCH") {
    try {
      const body = workspaceUpdateSchema.parse(req.body)


      const userRequest = await db.userOnWorkspace.findFirst({
        where: {
          AND: [
            { userId: { equals: session.user.id } },
            { workspaceId: { equals: req.body.workspaceId} }
          ]
        },
      })

      if (!userRequest || userRequest.role === ROLE_USER_ON_WORKSPACE.MEMBER) {
        return res.status(403).send({ code: '403', message: `You don't have permission to perform this action` })
      }


      if (body?.domain) {
        const domainExist = !!await db.workspace.findFirst({
          where: {
            domain: body.domain
          }
        })

        if (domainExist) {
          return res.status(409).send({ code: '409', message: `That domain is taken` });
        }
      }

      await db.workspace.update({
        where: { id: body.workspaceId, },
        data: omitFieldNullish({
          name: body?.name,
          domain: body?.domain,
        })
      })

      return res.send({ code: '200', message: 'success' })
      // return res.end()
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

export default withMethods(["PATCH", "POST"], handler)
// export default withMethods(["PATCH", "POST"], withPermission(handler))
