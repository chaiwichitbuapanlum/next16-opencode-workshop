"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps } from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "User", href: "/user" },
  { label: "About", href: "/about" },
  { label: "Course", href: "/course" },
] as const;

const isRouteActive = (pathname: string | null, href: string) => {
  if (!pathname) {
    return false;
  }

  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export const NavMenu = ({
  className,
  ...props
}: ComponentProps<typeof NavigationMenu>) => {
  const pathname = usePathname();

  return (
    <NavigationMenu className={className} {...props}>
      <NavigationMenuList className="data-[orientation=vertical]:-ms-2 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
        {NAV_LINKS.map(({ label, href }) => {
          const active = isRouteActive(pathname, href);

          return (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink
                asChild
                active={active}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary focus-visible:ring-primary/40 data-[state=open]:bg-primary/10 data-[state=open]:text-primary",
                  active && "bg-primary/15 text-primary shadow-sm"
                )}
              >
                <Link href={href} aria-current={active ? "page" : undefined}>
                  {label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
