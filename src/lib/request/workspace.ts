import { cache } from "react";
import { Notebook, Page, User, Workspace } from "@prisma/client";
import { db } from "lib/db";
import { freePlan, standardPlan } from "config/subscriptions";

export const omitFieldNullish = (obj) => {
  return Object.entries(obj)
  .filter(([_, v]) => v || v === 0)
  .reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? omitFieldNullish(v) : v }),
    {}
  );
}

export const getDetailWorkspace = cache(async (
  domain: Workspace["domain"],
  userId?: User["id"],
) => {
  const res = await db.workspace.findFirst({
    where: { domain },
    select: {
      id: true,
      name: true,
      domain: true,
      notebooks: {
        where: { teamspaceId: null, createdBy: userId }
      },
      teamspaces: {
        where: { archivedAt: null },
        // select: { notebooks: true, name: true, id: true }
      },
      userOnWorkspace: true,
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeWorkspaceId: true,
      stripeCustomerId: true,
      stripePriceId: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  if (!res) {
    return console.log('dauphaihau debug: workspace is null')
  }

  let isStandard;
  if (res?.stripeCurrentPeriodEnd) {
    isStandard =
      res.stripePriceId &&
      // !res.stripeCurrentPeriodEnd &&
      res.stripeCurrentPeriodEnd?.getTime() + 86_400_000 > Date.now()

  }

  let totalNotebooks = res.notebooks.length
  if (!isStandard) {
    // all notebooks in private + teamspaces
    totalNotebooks = await db.notebook.count({
      where: {
        workspace: { domain }
      }
    })
  }

  const plan = isStandard ? standardPlan : freePlan
  const totalMembers = res.userOnWorkspace.length

  return JSON.parse(JSON.stringify((
    {
      ...plan,
      ...res,
      isStandard,
      totalMembers,
      totalNotebooks,
    }
  )))
})

export const getListWorkspaceByUser = cache(async (userId: User["id"]) => {
  const res = await db.workspace.findMany({
    where: {
      userOnWorkspace: {
        some: {
          user: {
            id: userId
          }
        },
      }
    },
    // select: {
    //   id: true,
    //   name: true,
    //   domain: true,
    // }
  })

  // const res = await db.workspace.findMany({
  //   where: {
  //     // domain: domainWorkspace,
  //     // id: workspaceId,
  //     users: {
  //       some: {
  //         id: userId
  //       }
  //     }
  //   },
  //
  //   // select: {
  //   //   id: true,
  //   //   name: true,
  //   //   domain: true,
  //   //   notebooks: true
  //   //   // pages: true,
  //   //   // published: true,
  //   //   // createdAt: true,
  //   // },
  //   // orderBy: {
  //   //   updatedAt: "desc",
  //   // },
  //   //
  // })

  return JSON.parse(JSON.stringify(res))
})

export async function getWorkspaceUserAreAvailable(userId: User["id"]) {
  const res = await db.userOnWorkspace.findFirst({
    where: { userId },
    select: {
      workspace: {
        select: {
          id: true,
          name: true,
          domain: true,
        }
      }
    }
  })
  return JSON.parse(JSON.stringify(res))
}


