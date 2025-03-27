"use client";

import { LANDING_PAGE_LINKS } from "@/constants";
import { Session, User } from "lucia";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import UserAvatar from "../UserAvatar";

type LandingHeaderProps = {
  session: Session | null;
  user: User | null;
};

function LandingHeader({ session, user }: LandingHeaderProps) {
  const pathname = usePathname();
  return (
    <header className="sticky top-4 z-[99] my-4 hidden items-center justify-between rounded-2xl border bg-background p-6 shadow-md md:flex">
      {/* Tech Dome Logo */}
      <Link href="/" className="flex items-center gap-2 font-semibold italic">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
          TD
        </div>
        <span>Tech Dome</span>
      </Link>

      {/* Landing Page Links */}
      <div className="flex items-center gap-6 text-sm lg:text-base">
        {LANDING_PAGE_LINKS.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            className={`${pathname === link.url ? "text-main-violet-600" : ""} font-medium duration-200 hover:underline`}
          >
            {link.title}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-3">
        {session && user?.role === "CUSTOMER" && (
          <Link href={"/cart"} className="rounded-full bg-input p-2.5">
            <ShoppingCart
              size={20}
              strokeWidth={2.5}
              className="text-main-violet-600"
            />
          </Link>
        )}
        {session && user ? (
          <UserAvatar fullname={user.name} role={user.role} />
        ) : (
          <div className="flex flex-col items-center gap-4 text-sm font-medium lg:flex-row lg:text-base">
            <Link
              href={"/sign-in"}
              className="duration-200 hover:text-slate-800 hover:underline"
            >
              Sign In
            </Link>
            <Link href={"/register"}>
              <Button className="font-medium">Register</Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default LandingHeader;
