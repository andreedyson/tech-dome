"use client";

import { LANDING_PAGE_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

function LandingHeader() {
  const pathname = usePathname();
  return (
    <header className="my-4 hidden items-center justify-between rounded-2xl bg-gradient-to-r from-slate-900 to-gray-800 p-6 md:flex">
      {/* Deal Dome Logo */}
      <Link
        href="#"
        className="flex items-center gap-2 font-semibold italic text-white"
      >
        <div className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
          DD
        </div>
        <span className="hidden lg:block">Deal Dome</span>
      </Link>

      {/* Landing Page Links */}
      <div className="flex items-center gap-6 text-sm text-white md:text-base">
        {LANDING_PAGE_LINKS.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            className={`${pathname === link.url ? "text-main-violet-400" : ""} duration-200 hover:underline`}
          >
            {link.title}
          </Link>
        ))}
      </div>

      {/* Authentication Buttons */}
      <div className="flex items-center gap-4 font-medium text-white md:text-base">
        <Link
          href={"/sign-in"}
          className="text-white duration-200 hover:text-slate-300 hover:underline md:text-base"
        >
          Sign In
        </Link>
        <Link href={"/register"}>
          <Button className="font-medium">Register</Button>
        </Link>
      </div>
    </header>
  );
}

export default LandingHeader;
