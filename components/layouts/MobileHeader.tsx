"use client";

import { LANDING_PAGE_LINKS } from "@/constants";
import { cn } from "@/lib/utils";
import { AlignJustify, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function MobileHeader() {
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
    <div className="sticky top-0 z-20 md:mt-6">
      <nav className="relative mb-4 flex w-full items-center justify-between border bg-gradient-to-r from-slate-900 to-gray-800 p-4 md:hidden md:rounded-md">
        <div className="flex items-center gap-4">
          <div
            onClick={() => setOpenNav((prev) => !prev)}
            className="cursor-pointer"
          >
            {openNav ? (
              <X size={28} />
            ) : (
              <AlignJustify size={28} color="white" />
            )}
          </div>
          <div className="text-lg font-bold italic text-main-violet-500">
            Deal Dome
          </div>
        </div>

        <div
          className={`absolute top-[60px] flex h-[92vh] w-full flex-col bg-background p-4 shadow-[0px_0px_10px_2px_#00000024] duration-200 dark:bg-background ${openNav ? "left-0" : "-left-[1000px]"}`}
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
    </div>
  );
}

export default MobileHeader;
