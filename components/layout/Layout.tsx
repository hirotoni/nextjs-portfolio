import React from "react";
import Head from "next/head";
import EyeCatch from "../EyeCatch";
import Footer from "../Footer";
import Navbar from "../Navbar";

type Props = {
  children: React.ReactNode;
  home?: boolean;
  post?: boolean;
};

const Layout = ({ children, home, post }: Props) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Hirotoni's homepage" />
        <meta name="author" content="Hirotoni" />
      </Head>

      <div className="container mx-auto px-4 pb-14 lg:w-5/12">
        <Navbar enableFadeOutOnScroll={post} />

        <EyeCatch isHome={home} />

        <main>{children}</main>

        <Footer isHome={home} />
      </div>
    </>
  );
};

export default Layout;
