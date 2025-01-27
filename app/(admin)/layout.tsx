import { AppSidebar } from "@/components/AppSidebar";
import AdminHeader from "@/components/layouts/AdminHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
