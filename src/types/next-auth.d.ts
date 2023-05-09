import { User, Workspace } from "@prisma/client";

declare module "next-auth/jwt" {
  interface JWT {
    id: User.id
    image: string
    workspaceLastVisited: Workspace
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      workspaceLastVisited: Workspace
    }
  }
}
