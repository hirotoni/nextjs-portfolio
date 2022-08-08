import React from "react";
import Head from "next/head";
import EyeCatch from "../EyeCatch";
import Footer from "../Footer";
import Navbar from "../Navbar";

type Props = { children: React.ReactNode; home?: boolean };

const PostsLayout = ({ children, home }: Props) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Hirotoni's homepage" />
        <meta name="author" content="Hirotoni" />
      </Head>

      <Navbar enableFadeOutOnScroll />

      <div className="container mx-auto px-4 pb-14 pt-6 lg:w-6/12">
        <EyeCatch isHome={home} />

        <main>{children}</main>

        <Footer isHome={home} />
      </div>
    </>
  );
};

export default PostsLayout;
