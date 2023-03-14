import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { RequiresProPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"
import { omitFieldNullish } from "core/helpers";

const workspaceUpdateSchema = z.object({
  workspaceId: z.string(),
  name: z.string().optional(),
  domain: z.string().optional(),
})

const workspaceCreateSchema = z.object({
  name: z.string().optional(),
  domain: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const { user } = session

  if (req.method === "GET") {
    try {
      // const notebooks = await db.notebook.findMany({
      //   select: {
      //     id: true,
      //     title: true,
      //     published: true,
      //     createdAt: true,
      //   },
      //   where: {
      //     authorId: user.id,
      //   },
      // })

      const dbUser = await db.user.findFirst({
        where: {
          email: 'dauphaihau@yopmail.com',
        },
      })

      console.log('dauphaihau debug: db-user', dbUser)

      const domain = await db.domain.findFirst({
        select: {
          name: true,
        },
        where: {
          ownerId: user.id,
        },
      })

      console.log('dauphaihau debug: domain', domain)
      return res.json(domain)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "POST") {
    try {
      const body = workspaceCreateSchema.parse(req.body)

      const domainExist = !!await db.workspace.findFirst({
        where: {
          domain: body.domain
        }
      })

      if (domainExist) {
        return res.status(409).send({ code: '409', message: `That domain is taken` });
      }

      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          workspaces: {
            create: [{
              name: body.name,
              domain: body.domain,
              createdBy: session.user.id
            }]
          }
        },
      })

      return res.end()
    } catch (error) {
      console.log('dauphaihau debug: error', error)
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresProPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }

  if (req.method === "PATCH") {
    try {
      const body = workspaceUpdateSchema.parse(req.body)

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
        where: {
          id: body.workspaceId,
        },
        data: omitFieldNullish({
          name: body?.name,
          domain: body?.domain,
        })
      })

      return res.end()
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues)
      }

      if (error instanceof RequiresProPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }

}

export default withMethods(["PATCH", "GET", "POST"], handler)
