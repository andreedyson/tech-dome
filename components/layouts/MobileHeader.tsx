"use client";

import { LANDING_PAGE_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Session, User } from "lucia";

type MobileHeaderProps = {
  session: Session | null;
  user: User | null;
};

function MobileHeader({ session, user }: MobileHeaderProps) {
  const [openNav, setOpenNav] = useState<boolean>(false);
  const pathname = usePathname();
  const pagename = "/" + pathname.split("/")[1];

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) {
        setOpenNav(false);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="sticky top-0 z-20 md:mt-6">
      <nav className="relative flex w-full items-center justify-between border-b bg-background p-4 shadow-md md:hidden md:rounded-md">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              onClick={() => setOpenNav((prev) => !prev)}
              className="cursor-pointer"
            >
              {openNav ? <X size={28} /> : <AlignJustify size={28} />}
            </div>
            <div className="text-xl font-bold text-main-violet-500">
              Deal Dome
            </div>
          </div>
          {session && user?.role && (
            <p className="text-sm font-semibold underline">{user.name}</p>
          )}
        </div>

        {!session && (
          <Button className="rounded-full px-5">
            <Link
              href={"/sign-in"}
              className="duration-200 hover:text-slate-800 hover:underline md:text-base"
            >
              Sign In
            </Link>
          </Button>
        )}

        <div
          className={`absolute top-[60px] flex h-[92vh] w-full flex-col border bg-background p-4 duration-200 dark:bg-background ${openNav ? "left-0" : "-left-[1000px]"}`}
        >
          <div className="flex flex-col gap-4">
            {LANDING_PAGE_LINKS.map((link) => (
              <Link
                key={link.title}
                href={link.url}
                className={cn(
                  "flex items-center gap-2 rounded-md p-4 text-xs font-semibold",
                  pagename === link.url &&
                    "bg-main-200 text-main-800 dark:bg-main-950 dark:text-main-300 font-semibold shadow-[0px_0px_10px_2px_#00000024] transition-all duration-300 ease-in-out",
                )}
                onClick={() => setOpenNav(false)}
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default MobileHeader;
