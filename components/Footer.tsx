import Link from "next/link";
import React from "react";

type Props = {
  isHome: boolean;
};

const Footer = (props: Props) => {
  return (
    <footer className="flex flex-col items-center">
      {!props.isHome && (
        <div className="mt-12">
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}

      <div className="text-sm text-slate-500 mt-12">
        &copy; {new Date().getFullYear()} Hirotoni. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
