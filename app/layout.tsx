import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/ReactQueryProvider";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "TechDome",
  description: "Shop with Tech Dome",
};

export default function AootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${GeistSans.className} mx-auto max-w-[1920px] antialiased`}
      >
        <div>
          <ReactQueryProvider>
            {children}
            <Analytics />
          </ReactQueryProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
