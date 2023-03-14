// import { User } from "next-auth"
import { JWT } from "next-auth/jwt"
import { User, Workspace } from "@prisma/client";

// declare module "next-auth/jwt" {
//   type JWT = {
//     id: User.id
//     workspaces: Workspace[]
//
//     // user: User & {
//     //   workspaces: Workspace[]
//     //   // workspaces: UserId
//     // }
//   } & User
// }

declare module "next-auth/jwt" {
  interface JWT {
    id: User.id
    image: string
    workspaces: Workspace[]
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      workspaces: Workspace[]
      lastAccessWorkspace: Partial<Workspace>
    }
  }
}
