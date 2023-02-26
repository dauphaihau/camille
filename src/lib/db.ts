// const { PrismaClient } = require('./src/generated/client')
import { PrismaClient } from "@prisma/client";

// declare const global: Global & { prisma?: PrismaClient };
//
// let prisma: PrismaClient
// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient()
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient()
//   }
//   prisma = global.prisma
// }
//
// export const db = prisma

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma:  PrismaClient
}

let prisma:  PrismaClient
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
