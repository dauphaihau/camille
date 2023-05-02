import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import dayjs from "dayjs"

import { db } from "lib/db"
import { withMethods } from "lib/api-middlewares/with-methods"
import { authOptions } from "lib/auth"
import { DateTime } from "next-auth/providers/kakao";

import utc from 'dayjs/plugin/utc';

dayjs.extend(utc)

interface Queries {
  where: {
    title?: object
    notebook: object
    deletedAt: null | DateTime
    updatedAt?: object
  }
  orderBy: object
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(403).end()
  }

  // get pages by title, or initial load pages by date
  if (req.method === "GET") {
    try {
      const { workspaceId, searchValue } = req.query

      if (typeof searchValue !== "string") {
        console.log('dauphaihau debug: searchValue must be string')
        return res.status(400).end()
      }

      if (!workspaceId) {
        console.log('dauphaihau debug: workspaceId is null')
        return res.status(422).end()
      }

      let queries: Queries = {
        where: {
          notebook: { workspaceId },
          title: { contains: searchValue.toLowerCase() },
          deletedAt: null
        },
        orderBy: {
          updatedAt: 'desc'
        }
      }

      if (searchValue) {
        const pages = await db.page.findMany(queries)
        return res.send({ code: '200', data: { pages } })
      }

      // console.log('dauphaihau debug: string-date', String(new Date()))
      const dateLocalTime = dayjs()
      const dateUtcOffSet0 = dayjs().utcOffset(0).startOf('date');
      const dateUtc = dayjs().utc()

      // console.log('dauphaihau debug: date local timezone', dateLocalTime.format())
      // console.log('dauphaihau debug: date utc', dateUtc.format())
      // console.log('dauphaihau debug: date utc', dateUtcOffSet0.format())

      const today = dateUtcOffSet0.toDate(); // or format
      const yesterday = dateUtc.subtract(1, 'day').format()
      const twoDayAgo = dateUtc.subtract(2, 'day').format()
      const oneWeekAgo = dateUtc.subtract(1, 'week').format()
      const twoWeekAgo = dateUtc.subtract(2, 'week').format()
      const oneMonthAgo = dateUtc.subtract(1, 'month').format()
      const twoMonthAgo = dateUtc.subtract(2, 'month').format()

      delete queries.where.title

      queries.where.updatedAt = { gt: yesterday }
      const pagesToday = await db.page.findMany(queries)

      queries.where.updatedAt = { lt: today, gt: twoDayAgo }
      const pagesOfYesterday = await db.page.findMany(queries)

      queries.where.updatedAt = { lte: oneWeekAgo, gte: oneMonthAgo }
      const pagesOneWeekAgo = await db.page.findMany(queries)

      queries.where.updatedAt = { lte: oneMonthAgo, gt: twoMonthAgo }
      const pagesOneMonthAgo = await db.page.findMany(queries)

      queries.where.updatedAt = { lte: twoMonthAgo }
      const pagesOlder = await db.page.findMany(queries)

      res.send({
        code: '200', data: {
          pagesToday, pagesOfYesterday, pagesOneWeekAgo, pagesOneMonthAgo, pagesOlder
        }
      })
    } catch (error) {
      return res.status(500).end()
    }
  }

}

export default withMethods(["GET"], handler)
