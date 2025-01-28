import { getUser } from "@/lib/auth";
import { validateProtected } from "@/lib/check-session";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard",
};

async function DashboardPage() {
  const session = await validateProtected();
  return (
    <>
      {/* Dashboard Page Content */}
      <div>Dashboard</div>
    </>
  );
}

export default DashboardPage;
