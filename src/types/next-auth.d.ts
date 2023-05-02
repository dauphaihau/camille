import { User, Workspace } from "@prisma/client";

declare module "next-auth/jwt" {
  interface JWT {
    id: User.id
    image: string
    workspaces: Partial<Workspace>[]
  }
}

declare module "next-auth" {
  interface Session {
    user: User & {
      workspaces: Workspace[] | unknown
      lastAccessWorkspace: Partial<Workspace> | undefined
    }
  }
}
