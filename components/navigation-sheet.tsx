import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export const NavigationSheet = () => {
  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-6 py-3">
        <Logo />
        <NavMenu orientation="vertical" className="mt-6 [&>div]:h-full" />

        {/* Auth Links for Mobile */}
        <div className="mt-6 space-y-3">
          <Link href="/auth/signin" className="w-full">
            <Button variant="outline" className="w-full">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/signup" className="w-full">
            <Button className="w-full">Get Started</Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
};
