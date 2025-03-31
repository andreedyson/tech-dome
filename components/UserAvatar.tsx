"use client";

import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOut } from "@/lib/actions/auth/admin/actions";
import { LogOutIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type UserAvatarProps = {
  fullname: string;
  role: string;
};
function UserAvatar({ fullname, role }: UserAvatarProps) {
  const pathname = usePathname();
  const userInitial =
    fullname.split(" ").length > 1
      ? fullname.split(" ")[0].charAt(0) + fullname.split(" ")[1].charAt(0)
      : fullname.charAt(0);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-8 rounded-full md:size-10"
        >
          <Avatar className="flex items-center justify-center bg-main-violet-300 font-semibold">
            {userInitial}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="z-[100] w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 text-right">
            <p className="text-sm font-semibold leading-none">{fullname}</p>
            <p
              className={`"text-sm text-muted-foreground" font-medium leading-none ${role == "ADMIN" ? "text-red-500" : "text-slate-400"}`}
            >
              {role == "ADMIN" ? "Admin" : "Customer"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              href={
                role === "ADMIN" && !pathname.includes("/dashboard")
                  ? "/dashboard"
                  : role === "ADMIN" && pathname.includes("/dashboard")
                    ? "/"
                    : "/profile"
              }
              className="w-full"
            >
              {role === "ADMIN" && !pathname.includes("/dashboard")
                ? "Dashboard"
                : role === "ADMIN" && pathname.includes("/dashboard")
                  ? "Main Page"
                  : "Profile"}
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => SignOut()}
            className="cursor-pointer font-semibold text-red-500"
          >
            Log out
            <DropdownMenuShortcut className="text-red-500">
              <LogOutIcon size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserAvatar;
