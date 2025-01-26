import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title: {
    template: "DealDome | %s",
    default: "DealDome",
  },
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className={`${GeistSans.className} antialiased`}>
      <div>
        {children}
        <Toaster />
      </div>
    </main>
  );
}
