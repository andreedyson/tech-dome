import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/ReactQueryProvider";
import LandingHeader from "@/components/layouts/LandingHeader";
import MobileHeader from "@/components/layouts/MobileHeader";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { validateProtected } from "@/lib/check-session";
import Footer from "@/components/pages/Footer";

export const metadata: Metadata = {
  title: "TechDome",
  description: "Shop with Tech Dome",
};

export default async function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await getUser();

  return (
    <main lang="en">
      <div
        className={`${GeistSans.className} max-w-[1920px] antialiased md:mx-[80px] lg:mx-[144px] 2xl:mx-auto`}
      >
        <LandingHeader session={session} user={user} />
        <MobileHeader session={session} user={user} />
        <ReactQueryProvider>
          <div className="my-4 max-md:mx-4">{children}</div>
          <Toaster />
        </ReactQueryProvider>
      </div>
      <Footer />
    </main>
  );
}
