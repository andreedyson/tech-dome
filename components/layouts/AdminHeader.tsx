"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import React from "react";
import UserAvatar from "../UserAvatar";
import { Session } from "lucia";
import { User } from "lucia";

type AdminHeaderProps = {
  session: Session | null;
  user: User | null;
};

function AdminHeader({ session, user }: AdminHeaderProps) {
  const pathname = usePathname();
  const pathnames = pathname.split("/").filter((x) => x);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {pathnames.slice(0, 3).map((segment, index) => {
              const isLastSegment = index === pathnames.length - 1;
              const href = `/${pathnames.slice(0, index + 1).join("/")}`;

              return (
                <React.Fragment key={index}>
                  {isLastSegment ? (
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  ) : (
                    <BreadcrumbItem>
                      <BreadcrumbLink href={href}>
                        {segment.charAt(0).toUpperCase() + segment.slice(1)}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                  )}
                  {!isLastSegment && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
            {pathnames.length > 3 && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>...</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <UserAvatar fullname={user?.name as string} role={user?.role as string} />
    </header>
  );
}

export default AdminHeader;
