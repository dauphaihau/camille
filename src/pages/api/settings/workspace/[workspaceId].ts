import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { RequiresProPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"

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

  const { user } = session

  // if (req.method === "GET") {
  //   try {
  //     // const notebooks = await db.notebook.findMany({
  //     //   select: {
  //     //     id: true,
  //     //     title: true,
  //     //     published: true,
  //     //     createdAt: true,
  //     //   },
  //     //   where: {
  //     //     authorId: user.id,
  //     //   },
  //     // })
  //
  //     const dbUser = await db.user.findFirst({
  //       where: {
  //         email: 'dauphaihau@yopmail.com',
  //       },
  //     })
  //
  //     console.log('dauphaihau debug: db-user', dbUser)
  //
  //     const domain = await db.domain.findFirst({
  //       select: {
  //         name: true,
  //       },
  //       where: {
  //         ownerId: user.id,
  //       },
  //     })
  //
  //     console.log('dauphaihau debug: domain', domain)
  //     return res.json(domain)
  //   } catch (error) {
  //     return res.status(500).end()
  //   }
  // }
  //


  if (req.method === "DELETE") {
    try {
      const deleteTracks = db.trackingUserAccess.deleteMany({
        where: {
          lastAccessWorkspaceId: req.query.workspaceId as string
        },
      })

      const deleteNotebooks = db.notebook.deleteMany({
        where: {
          workspaceId: req.query.workspaceId as string
        },
      })

      const deleteWorkspace = db.workspace.delete({
        where: {
          id: req.query.workspaceId as string
        },
      })

      const transaction = await db.$transaction([deleteTracks,  deleteNotebooks, deleteWorkspace])
      // console.log('dauphaihau debug: transaction', transaction)

      res.end()
    } catch (error) {
      console.log('dauphaihau debug: error', error)
      return res.status(500).end()
    }
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

      // console.log('dauphaihau debug: session', session)

      console.log('dauphaihau debug: req-body', req.body)
      console.log('dauphaihau debug: -session-user-id-req-body-workspace-id-', [session.user.id, req.body.workspaceId])

      // const body = getTrackingUserAccessSchema.parse(req.body)

      console.log('dauphaihau debug: body', JSON.parse(req.body))

      const body = JSON.parse(req.body)

      const data = await db.trackingUserAccess.findFirstOrThrow({
        where: {
          AND: [
            { userId: session.user.id },
            { lastAccessWorkspaceId: body.workspaceId },
          ]
        }
      })

      return res.json(data)
    } catch (error) {
      return res.status(500).end()
    }
  }


  if (req.method === "PATCH") {
    try {
      const body = workspacePathSchema.parse(req.body)
      const userId = req.query.userId as string

      const isTrackingUserAccessExist = await db.trackingUserAccess.findFirst({
        where: {
          AND: [
            { userId },
            { lastAccessWorkspaceId: body.lastAccessWorkspaceId },
          ]
        }
      })

      if (isTrackingUserAccessExist) {
        console.log('dauphaihau debug: case update')
        await db.trackingUserAccess.update({
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
        console.log('dauphaihau debug: case create')
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

        await db.trackingUserAccess.create({
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

      if (error instanceof RequiresProPlanError) {
        return res.status(402).end()
      }

      return res.status(500).end()
    }
  }

}

export default withMethods(["PATCH", "GET", "POST", 'DELETE'], handler)
