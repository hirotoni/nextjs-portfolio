import "@/styles/global.css";
import "prismjs/themes/prism-tomorrow.css";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import EyeCatch from "@/components/EyeCatch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hirotoni's homepage",
  description: "Hirotoni's homepage",
  authors: { name: "Hirotoni", url: "https://hirotoni.com" },
  icons: "/favicon.ico",
};

type Props = {
  children: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return (
    <html lang="ja">
      <body>
        <div className="container mx-auto px-4 pb-14 lg:w-5/12">
          <header>
            <Navbar />
            <EyeCatch />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
        </div>
      </body>
    </html>
  );
}

export default RootLayout;
