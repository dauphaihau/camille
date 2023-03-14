import { cache } from "react";
import { User } from "@prisma/client";
import { db } from "lib/db";

export const getDomain = cache(async (userId: User["id"]) => {
  return await db.domain.findFirst({
    select: {
      name: true,
    },
    where: {
      ownerId: userId,
    },
  })
})
