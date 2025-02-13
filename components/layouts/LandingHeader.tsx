"use client";

import { LANDING_PAGE_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { Session } from "lucia";

type LandingHeaderProps = {
  session: Session | null;
};

function LandingHeader({ session }: LandingHeaderProps) {
  const pathname = usePathname();
  return (
    <header className="my-4 hidden items-center justify-between rounded-2xl border p-6 shadow-md md:flex">
      {/* Deal Dome Logo */}
      <Link href="#" className="flex items-center gap-2 font-semibold italic">
        <div className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
          DD
        </div>
        <span className="hidden lg:block">Deal Dome</span>
      </Link>

      {/* Landing Page Links */}
      <div className="flex items-center gap-6 text-sm md:text-base">
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

      {/* Authentication Buttons */}
      {!session && (
        <div className="flex items-center gap-4 font-medium md:text-base">
          <Link
            href={"/sign-in"}
            className="duration-200 hover:text-slate-800 hover:underline md:text-base"
          >
            Sign In
          </Link>
          <Link href={"/register"}>
            <Button className="font-medium">Register</Button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default LandingHeader;
