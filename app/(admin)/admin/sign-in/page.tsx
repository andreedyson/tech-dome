import { AdminLoginForm } from "@/components/auth/AdminLoginForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const maxDuration = 20;

function SignInPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold italic"
          >
            <div className="flex size-8 items-center justify-center rounded-md bg-primary font-bold text-primary-foreground">
              TD
            </div>
            Tech Dome
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <AdminLoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src="/assets/auth-image.jpg"
          alt="Image"
          width={2000}
          height={2000}
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 bg-black opacity-35" />
      </div>
    </div>
  );
}

export default SignInPage;
