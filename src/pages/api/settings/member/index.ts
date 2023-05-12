import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { RequiresStandardPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"
import { ROLE_USER_ON_WORKSPACE } from "config/const";
import { getWorkspaceSubscriptionPlan } from "lib/request/subscription";
import { withPermission } from "lib/api-middlewares/with-permission";

const removeMemberSchema = z.object({
  workspaceId: z.string(),
  userId: z.string()
})

const addMemberSchema = z.object({
  workspaceId: z.string(),
  email: z.string()
})

const updateRoleMemberSchema = z.object({
  workspaceId: z.string(),
  userId: z.string(),
  role: z.nativeEnum(ROLE_USER_ON_WORKSPACE)
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const currentWorkspace = session.user.workspaceLastVisited

  if (req.method === "GET") {
    try {
      const userOnWs = await db.userOnWorkspace.findFirst({
        where: {
          AND: [
            { userId: { equals: session.user.id } },
            { workspaceId: { equals: currentWorkspace.id } }
          ]
        },
      })

      if (userOnWs) {
        await db.userOnWorkspace.delete({
          where: { id: userOnWs.id }
        })
      }

      await db.userOnTeamspace.deleteMany({
        where: {
          AND: [
            { userId: { equals: session.user.id } },
            {
              teamspace: {
                workspaceId: {
                  equals: currentWorkspace.id
                }
              }
            }
          ]
        },
      })

      // case user leave
      // if session.user.id === session.user.id) {
      const totalUsers = await db.userOnWorkspace.findMany({
        where: { workspaceId: currentWorkspace.id, userId: { not: session.user.id } },
        select: { id: true, userId: true, createdAt: true, role: true },
      })

      // grant admin rights to last user
      if (totalUsers.length === 1) {
        const userOnWorkspace = totalUsers[0]
        await db.userOnWorkspace.update({
          where: { id: userOnWorkspace.id },
          data: { role: ROLE_USER_ON_WORKSPACE.ADMIN }
        })
      }

      if (totalUsers.length > 1) {
        const isStillHaveAdmin = totalUsers.some((o) => o.role === ROLE_USER_ON_WORKSPACE.ADMIN)

        // grant admin rights to last user by createdAt
        if (!isStillHaveAdmin) {
          await db.userOnWorkspace.update({
            where: { id: totalUsers[0].id },
            data: { role: ROLE_USER_ON_WORKSPACE.ADMIN }
          })
        }
      }

      // get domain to redirect another workspace when user leave
      const workspace = await db.userOnWorkspace.findFirst({
        where: { userId: session.user.id },
        select: { workspace: { select: { domain: true } } }
      })
      return res.send({
        code: '200',
        message: 'success',
        data: workspace
        // redirectToDomain: workspace && workspace.domain
      })

      // return res.send({ code: '200', message: 'Remove member success' })
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

  //-------- check permission form here
  const userRequest = await db.userOnWorkspace.findFirst({
    where: {
      AND: [
        { userId: { equals: session.user.id } },
        { workspaceId: { equals: req.body.workspaceId } }
      ]
    },
  })

  if (!userRequest || userRequest.role === ROLE_USER_ON_WORKSPACE.MEMBER) {
    return res.status(403).send({ code: '403', message: `You don't have permission to perform this action` })
  }

  // add member, new teamspace
  if (req.method === "POST") {
    try {
      const body = addMemberSchema.parse(req.body)

      const isUserExist = !!await db.user.findFirst({
        where: { email: body.email }
      })
      if (!isUserExist) {
        return res.status(409).send({ code: '409', message: `User ${body.email} doesn't exist` });
      }

      const isUserAlreadyInWs = !!await db.userOnWorkspace.findFirst({
        where: {
          workspaceId: body.workspaceId,
          user: { email: body.email },
        }
      })
      if (isUserAlreadyInWs) {
        return res.status(409).send({ code: '409', message: `Already an existing user ${body.email}` });
      }

      const plan = await getWorkspaceSubscriptionPlan(body.workspaceId)
      await db.userOnWorkspace.create({
        data: {
          workspace: {
            connect: { id: body.workspaceId }
          },
          user: {
            connect: { email: body.email }
          },
          role: plan?.isStandard ? ROLE_USER_ON_WORKSPACE.MEMBER : ROLE_USER_ON_WORKSPACE.ADMIN
        },
      })

      // create teamspace ( origin ) -> add new member into teamspace ( origin )
      // Does workspace a have any teamspaces?
      // does workspace only have 1 user ?
      const teamspace = !!await db.teamspace.findFirst({
        where: {
          workspaceId: body.workspaceId,
        }
      })
      if (!teamspace) {
        const teamspaceOrigin = await db.teamspace.create({
          data: {
            workspaceId: body.workspaceId,
            name: 'General',
            isOrigin: true,
            createdBy: session.user.id,
          }
        })

        if (teamspaceOrigin) {
          await db.notebook.create({
            data: {
              workspaceId: body.workspaceId,
              teamspaceId: teamspaceOrigin.id,
              title: 'Teamspace Home',
              createdBy: session.user.id
            }
          })

          await db.userOnTeamspace.create({
            data: {
              user: {
                connect: { email: body.email }
              },
              teamspace: {
                connect: { id: teamspaceOrigin.id }
              },
            },
          })
        }
      }
      return res.send({ code: '200', message: 'Add member success' })
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

  // delete member
  if (req.method === "DELETE") {
    try {

      const userId = req.query.userId as string

      const record = await db.userOnWorkspace.findFirst({
        where: {
          AND: [
            { userId: { equals: userId } },
            { workspaceId: { equals: currentWorkspace.id } }
          ]
        },
      })

      if (record) {
        await db.userOnWorkspace.delete({
          where: { id: record.id }
        })
      }

      await db.userOnTeamspace.deleteMany({
        where: {
          AND: [
            { userId: { equals: userId } },
            {
              teamspace: {
                workspaceId: {
                  equals: currentWorkspace.id
                }
              }
            }
          ]
        },
      })

      return res.send({ code: '200', message: 'Remove member success' })
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

  // update role
  if (req.method === "PATCH") {
    try {

      const body = updateRoleMemberSchema.parse(req.body)

      const record = await db.userOnWorkspace.findFirst({
        where: {
          AND: [
            { userId: { equals: body.userId } },
            { workspaceId: { equals: body.workspaceId } }
          ]
        },
      })

      if (record) {
        await db.userOnWorkspace.update({
          where: { id: record.id },
          data: { role: body.role }
        })
      }

      return res.send({ code: '200', message: 'Update role member success' })
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

export default withMethods(["PATCH", 'GET', "POST", 'DELETE'], handler)
