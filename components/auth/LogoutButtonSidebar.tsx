"use client";

import { SignOut } from "@/lib/actions/auth/admin/actions";
import { ActionResult } from "@/types/auth";
import { LogOut } from "lucide-react";
import { useFormState } from "react-dom";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const initialState: ActionResult = {
  error: "",
};

function LogoutButtonSidebar() {
  const [state, formAction] = useFormState(SignOut, initialState);
  return (
    <form action={formAction}>
      <SidebarFooter className="cursor-pointer">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="my-3 flex items-center justify-center gap-2 font-semibold text-red-500">
              <LogOut size={20} />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </form>
  );
}

export default LogoutButtonSidebar;
