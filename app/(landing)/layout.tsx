import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/ReactQueryProvider";
import LandingHeader from "@/components/layouts/LandingHeader";
import MobileHeader from "@/components/layouts/MobileHeader";

export const metadata: Metadata = {
  title: "DealDome",
  description: "Shop with Deal Dome",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} max-w-[1920px] antialiased md:mx-[80px] lg:mx-[144px] 2xl:mx-auto`}
      >
        <div>
          <LandingHeader />
          <MobileHeader />
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
