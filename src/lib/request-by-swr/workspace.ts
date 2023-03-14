import { db } from "lib/db";
// import { omitFieldNullish } from "../core";

export const omitFieldNullish = (obj) => {
  return Object.entries(obj)
  .filter(([_, v]) => v || v === 0)
  .reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v === Object(v) ? omitFieldNullish(v) : v }),
    {}
  );
}

export async function updateTrackingUserAccess(userId, values) {
  console.log('dauphaihau debug: -user-id-values-', [userId, values])

  // const response = await fetch(`http://localhost:3000/api/user/tracking/${userId}`, {
  // // const response = await feth(`/api/user/tracking/track`, {
  // //   method: "POST",
  //   method: "PATCH",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(values),
  // })

  // const test = omitFieldNullish({
  //   userId,
  //   workspaceId: values?.workspaceId,
  //   notebookId: values?.notebookId,
  //   pageId: values?.pageId,
  // })
  // console.log('dauphaihau debug: test', test)
  //
  // await db.trackingUserAccess.upsert({
  //   where: {
  //     userId
  //   },
  //   update: omitFieldNullish({
  //     lastAccessWorkspaceId: values?.workspaceId,
  //     lastAccessNotebookId: values?.notebookId,
  //     lastAccessPageId: values?.pageId,
  //   }),
  //   create: omitFieldNullish({
  //     userId,
  //     lastAccessWorkspaceId: values?.workspaceId,
  //     lastAccessNotebookId: values?.notebookId,
  //     lastAccessPageId: values?.pageId,
  //   }),
  // })

}

