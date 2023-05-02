import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { RequiresStandardPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"
import { pagePatchSchema } from "../../../../lib/validations/page";

const workspacePathSchema = z.object({
  lastAccessWorkspaceId: z.string().optional(),
  lastAccessNotebookId: z.string().optional(),
  lastAccessPageId: z.string().optional(),
})

const getTrackingUserAccessSchema = z.object({
  workspaceId: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  if (req.method === "POST") {
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

      // const body = getTrackingUserAccessSchema.parse(req.body)

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
        where: {
          id: userId
        },
        data: {
          lastAccessWorkspaceId: body.lastAccessWorkspaceId,
        }
      })

      // const isTrackingUserAccessExist = await db.trackingUserAccess.findFirst({
      const isTrackingUserAccessExist = await db.trackingUserAccessOnWorkspace.findFirst({
        where: {
          AND: [
            { userId },
            { workspaceId: body.lastAccessWorkspaceId },
            // { lastAccessWorkspaceId: body.lastAccessWorkspaceId },
          ]
        }
      })

      if (isTrackingUserAccessExist) {
        // console.log('dauphaihau debug: case update')
        // await db.trackingUserAccess.update({
        await db.trackingUserAccessOnWorkspace.update({
          where: {
            id: isTrackingUserAccessExist.id
          },
          data: {
            // lastAccessWorkspaceId: body.lastAccessWorkspaceId,
            lastAccessNotebookId: body.lastAccessNotebookId,
            lastAccessPageId: body.lastAccessPageId ?? '',
          }
        })
      } else {
        // console.log('dauphaihau debug: case create')
        // await db.user.upsert({
        //   where: {
        //     id: userId,
        //   },
        //   update: {
        //     trackingUserAccess: {
        //       create: {
        //         // userId,
        //         // lastAccessWorkspaceId: body.lastAccessWorkspaceId,
        //         // lastAccessNotebookId: body.lastAccessNotebookId,
        //         // lastAccessPageId: body.lastAccessPageId ?? '',
        //         lastAccessWorkspaceId: 'cler7yd1w0004m3ngmtf5ry3a',
        //         lastAccessNotebookId: 'clesaota90035m3rjv2jfox0i',
        //         lastAccessPageId: body.lastAccessPageId ?? '',
        //       }
        //     }
        //   },
        //   create: {
        //     trackingUserAccess: {
        //       create: {
        //         // userId,
        //         // lastAccessWorkspaceId: body.lastAccessWorkspaceId,
        //         // lastAccessNotebookId: body.lastAccessNotebookId,
        //         // lastAccessPageId: body.lastAccessPageId ?? '',
        //         lastAccessWorkspaceId: 'cler7yd1w0004m3ngmtf5ry3a',
        //         lastAccessNotebookId: 'clesaota90035m3rjv2jfox0i',
        //         lastAccessPageId: body.lastAccessPageId ?? '',
        //       }
        //     }
        //   }
        //   // data: {
        //   //   trackingUserAccess: {
        //   //     create: {
        //   //
        //   //       // userId,
        //   //       // lastAccessWorkspaceId: body.lastAccessWorkspaceId,
        //   //       // lastAccessNotebookId: body.lastAccessNotebookId,
        //   //       // lastAccessPageId: body.lastAccessPageId ?? '',
        //   //       lastAccessWorkspaceId: 'cler7yd1w0004m3ngmtf5ry3a',
        //   //       lastAccessNotebookId: 'clesaota90035m3rjv2jfox0i',
        //   //       lastAccessPageId: body.lastAccessPageId ?? '',
        //   //     }
        //   //   }
        //   // }
        // })

        // await db.trackingUserAccess.create({
        await db.trackingUserAccessOnWorkspace.create({
          data: {
            user: {
              connect: {
                id: userId
              }
            },
            workspace: {
              connect: {
                id: body.lastAccessWorkspaceId
              }
            },
            lastAccessNotebookId: body.lastAccessNotebookId,
            lastAccessPageId: body.lastAccessPageId ?? '',
          }
        })

        // await db.user.update({
        //   where: {
        //     id: userId
        //   },
        //   data: {
        //     trackingUserAccess: {
        //       connectOrCreate: {
        //         where: {
        //           // id: '1k2k',
        //           lastAccessWorkspaceId: body.lastAccessWorkspaceId
        //           // userId_lastAccessWorkspaceId: {
        //           //   userId,
        //           //   lastAccessWorkspaceId: body.lastAccessWorkspaceId
        //           // }
        //         },
        //         create: {
        //           // id: 'akcank2',
        //           lastAccessWorkspaceId: body.lastAccessWorkspaceId,
        //           lastAccessNotebookId: body.lastAccessNotebookId,
        //           lastAccessPageId: body.lastAccessPageId ?? '',
        //         }
        //       }
        //     }
        //   }
        // })

        // await db.trackingUserAccess.upsert({
        //   where: {
        //     id: isExist.id
        //     // userId: {
        //     //   equals: userId
        //     // },
        //     // lastAccessWorkspaceId: {
        //     //   equals: body.lastAccessWorkspaceId
        //     // },
        //     // lastAccessWorkspaceId: body.lastAccessWorkspaceId,
        //     // userId
        //     // userId,
        //   },
        //   update: {
        //     lastAccessWorkspaceId: body.lastAccessWorkspaceId,
        //     lastAccessNotebookId: body.lastAccessNotebookId,
        //     lastAccessPageId: body.lastAccessPageId ?? '',
        //     // lastAccessPageId: body.lastAccessPageId,
        //   },
        //   create: {
        //     userId,
        //     lastAccessWorkspaceId: body.lastAccessWorkspaceId,
        //     lastAccessNotebookId: body.lastAccessNotebookId,
        //     lastAccessPageId: body.lastAccessPageId,
        //   },
        // })

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
