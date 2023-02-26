"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "lib/utils"
import { Icons } from "core/components"
import React from "react";

interface DashboardNavProps {
  items: SidebarNavItem[]
}

export function DashboardNav({ items }: DashboardNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    // <nav className="grid items-start gap-1 px-1">
    <nav className="grid items-start gap-1 px-1">
      {items.map((item, index) => {
        const Icon = Icons[item.icon]
        return (
          <Link key={index} href={item.disabled ? "/" : item.href}>
            <span
              className={cn(
                "group flex items-center rounded px-3 py-2 text-sm font-medium text-slate-800 hover:bg-[#ecebea]",
                path === item.href ? "bg-[#ecebea] text-black" : "transparent",
                item.disabled && "cursor-not-allowed opacity-80"
              )}
            >
              <Icon className="mr-2 h-4 w-4"/>
              <span>{item.title}</span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}
