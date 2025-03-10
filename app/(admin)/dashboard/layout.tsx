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
    template: "%s | TechDome",
    default: "TechDome",
  },
  description: "Shop with Tech Dome",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getUser();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className={`${GeistSans.className} w-full antialiased`}>
        <AdminHeader user={user} session={session} />
        <div className="m-4">{children}</div>
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
