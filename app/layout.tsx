import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import ReactQueryProvider from "@/ReactQueryProvider";

export const metadata: Metadata = {
  title: "DealDome",
  description: "Shop with Deal Dome",
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
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
