"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();
  const isHome = pathname === "/" ? true : false;
  return (
    <footer className="flex flex-col items-center">
      {!isHome && (
        <div className="mt-12">
          <Link href="/">← Back to home</Link>
        </div>
      )}

      <div className="text-sm text-slate-500 mt-12">
        &copy; {new Date().getFullYear()} Hirotoni. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
