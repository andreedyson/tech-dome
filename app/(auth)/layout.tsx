import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "DealDome",
};

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getUser();

  if (session && user.role === "ADMIN") {
    return redirect("/dashboard");
  }
  return (
    <main className={`${GeistSans.className} antialiased`}>
      <div>
        {children}
        <Toaster />
      </div>
    </main>
  );
}
