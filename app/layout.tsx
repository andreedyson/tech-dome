import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "DealDome",
  description: "Shop with Deal Dome",
};

export default function ARootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.className} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
