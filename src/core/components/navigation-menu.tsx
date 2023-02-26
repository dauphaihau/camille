import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cn } from "core/helpers";
import { forwardRef } from "react";

type NavigationMenuProps = NavigationMenuPrimitive.NavigationMenuProps

export function NavigationMenu({ ...props }: NavigationMenuProps) {
  return (
    <NavigationMenuPrimitive.Root
      className={cn('NavigationMenuRoot', 'max-w-5xl h-16 py-4  mx-auto')}
      {...props}/>
  )
}

NavigationMenu.Item = forwardRef<HTMLDivElement,
  NavigationMenuPrimitive.NavigationMenuItemProps>(function NavigationMenuItem({ className, ...props }, ref: any) {
  return (
    <NavigationMenuPrimitive.NavigationMenuItem
      ref={ref}
      {...props}/>
  )
})
