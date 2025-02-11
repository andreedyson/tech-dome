import { AppSidebar } from "@/components/AppSidebar";
import AdminHeader from "@/components/layouts/AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { getUser } from "@/lib/auth";
import { GeistSans } from "geist/font/sans";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: {
    template: "%s | DealDome",
    default: "DealDome",
  },
  description: "Shop with Deal Dome",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session } = await getUser();

  if (!session) {
    redirect("/sign-in");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`${GeistSans.className} w-full antialiased`}>
        <AdminHeader />
        <div className="m-4">{children}</div>
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
