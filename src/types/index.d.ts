import { Icons } from "@/components/icons"
import { User, Workspace } from "@prisma/client"

export type NavItem = {
  title: string
  href: string
  disabled?: boolean
}

export type MainNavItem = NavItem

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
  href: string
  items?: never
}
  | {
  href?: string
  items: NavLink[]
}
  )

export type SiteConfig = {
  name: string
  links: {
    twitter: string
    github: string
  }
}

export type DocsConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type MarketingConfig = {
  mainNav: MainNavItem[]
}

export type DashboardConfig = {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export type SubscriptionPlan = {
  name: string
  description: string
  stripePriceId: string | null
  limitedNotebooks: number
}

export type WorkspaceSubscriptionPlan = SubscriptionPlan &
  Pick<Workspace, "stripeWorkspaceId" | "stripeSubscriptionId"> & {
  // stripeCurrentPeriodEnd: number | undefined
  stripeCurrentPeriodEnd: number
  stripeCustomerId: string
  isStandard: boolean
}
