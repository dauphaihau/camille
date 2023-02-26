import { NextApiRequest, NextApiResponse } from "next"
import * as z from "zod"
import { unstable_getServerSession } from "next-auth/next"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { getUserSubscriptionPlan } from "lib/subscription"
import { RequiresProPlanError } from "lib/exceptions"
import { authOptions } from "lib/auth"
import { pagePatchSchema } from "lib/validations/page"

const pageCreateSchema = z.object({
  notebookId: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await unstable_getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  const { user } = session

  // if (req.method === "GET") {
  //   try {
  //     const pages = await db.page.findMany({
  //       select: {
  //         id: true,
  //         title: true,
  //         published: true,
  //         createdAt: true,
  //       },
  //       // where: {
  //       //   authorId: user.id,
  //       // },
  //       where: {
  //         // notebookId: user.id,
  //       },
  //     })
  //
  //     return res.json(pages)
  //   } catch (error) {
  //     return res.status(500).end()
  //   }
  // }

  if (req.method === "GET") {
    try {
      const { notebookId } = req.query
      const notebook =  await db.notebook.findFirst({
        where: {
          id: notebookId.toString(),
        },
        select: {
          id: true,
          title: true,
          description: true,
          // Page: true,
          pages: true,
          published: true,
          createdAt: true,
        },
        orderBy: {
          updatedAt: "desc",
        },
      })

      return res.json(notebook)

      // const pages = await db.page.findMany({
      //   select: {
      //     id: true,
      //     title: true,
      //     published: true,
      //     createdAt: true,
      //   },
      //   // where: {
      //   //   authorId: user.id,
      //   // },
      //   where: {
      //     // notebookId: user.id,
      //   },
      // })
      //
      // return res.json(pages)
    } catch (error) {
      return res.status(500).end()
    }
  }

  if (req.method === "POST") {
    try {
      // const subscriptionPlan = await getUserSubscriptionPlan(user.id)
      //
      // // If user is on a free plan.
      // // Check if user has reached limit of 3 posts.
      // if (!subscriptionPlan?.isPro) {
      //   const count = await db.page.count({
      //     where: {
      //       authorId: user.id,
      //     },
      //   })
      //
      //   if (count >= 3) {
      //     throw new RequiresProPlanError()
      //   }
      // }

      const body = pageCreateSchema.parse(req.body)
      // console.log('dauphaihau debug: body', body)

      const page = await db.page.create({
        data: {
          title: body.title,
          content: body.content,
          // authorId: session.user.id,
          // notebookId: session.user.id,
          notebookId: body.notebookId
        },
        select: {
          id: true,
        },
      })

      return res.json(page)
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

export default withMethods(["GET", "POST"], handler)
