"use client";

import {
  ChartBarStacked,
  Home,
  Boxes,
  MapPin,
  Building,
  ShoppingCart,
  LogOut,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButtonSidebar from "./auth/LogoutButtonSidebar";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: ChartBarStacked,
  },
  {
    title: "Locations",
    url: "/dashboard/locations",
    icon: MapPin,
  },
  {
    title: "Brands",
    url: "/dashboard/brands",
    icon: Building,
  },
  {
    title: "Products",
    url: "/dashboard/products",
    icon: Boxes,
  },
  {
    title: "Orders",
    url: "/dashboard/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    url: "/dashboard/customers",
    icon: Users,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const pathnameSplit = pathname.split("/").slice(0, 3).join("/");

  return (
    <Sidebar collapsible="icon" className="border-r-4">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary font-bold text-sidebar-primary-foreground">
                  TD
                </div>
                <div className="leading-none">
                  <span className="font-semibold italic">Tech Dome</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={`duration-200 hover:text-main-violet-500 ${pathnameSplit === item.url ? "font-semibold text-main-violet-700" : ""}`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <LogoutButtonSidebar />
    </Sidebar>
  );
}
