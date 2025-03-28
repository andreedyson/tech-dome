import { Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="mt-12 flex flex-col justify-between bg-main-violet-800 px-4 py-10 text-primary-foreground max-sm:items-center md:px-[80px] lg:px-[144px] 2xl:mx-auto">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Tech Dome Logo & Contacts */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 font-semibold italic"
          >
            <div className="flex size-8 items-center justify-center rounded-md bg-primary font-bold">
              TD
            </div>
            <span>Tech Dome</span>
          </Link>
          <p className="mt-2 max-w-[300px] text-sm text-slate-300">
            Discover and shop for top-quality tech products at the best prices
            with exclusive deals and offers.
          </p>
          <div className="mt-4 space-y-1 text-sm">
            <p>📍 Address: Jl. Teknologi No. 123, Jakarta, Indonesia </p>
            <p>📧 Email: support@techdome.com </p>
            <p>📞 Phone: +62 812-1212-1313</p>
          </div>
        </div>
        {/* Tech Dome Navigations */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="space-y-2">
            <h4 className="text-base font-bold">Navigation</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <Link href={"/"} className="hover:text-white">
                Home
              </Link>
              <Link href={"/catalogs"} className="hover:text-white">
                Catalogs
              </Link>
              <Link href={"/brands"} className="hover:text-white">
                Brands
              </Link>
              <Link href={"/categories"} className="hover:text-white">
                Categories
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold">Spotlight</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <Link href={"/"} className="hover:text-white">
                About Us
              </Link>
              <Link href={"/"} className="hover:text-white">
                FAQ
              </Link>
              <Link href={"/"} className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-base font-bold">Policy</h4>
            <div className="flex flex-col gap-3 text-sm text-slate-300">
              <Link href={"/"} className="hover:text-white">
                Terms & Agreements
              </Link>
              <Link href={"/"} className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href={"/"} className="hover:text-white">
                Help
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-5 text-sm">© 2025 Tech Dome. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
