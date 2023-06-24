"use client";

import { MDXRemote } from "next-mdx-remote";
import { Main } from "next/document";
import React from "react";
import {
  H1,
  H2,
  H3,
  Ol,
  Ul,
  A,
  P,
  Pre,
  Code,
  Table,
  Blockquote,
  Img,
  Hr,
} from "../../../../components/posts/MdxPostComponents";
import { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  main: Main,
  h1: H1,
  h2: H2,
  h3: H3,
  ol: Ol,
  ul: Ul,
  a: A,
  p: P,
  pre: Pre,
  code: Code,
  table: Table,
  blockquote: Blockquote,
  img: Img,
  hr: Hr,
};

function MdxContent({ mdxPostContent }) {
  return <MDXRemote {...mdxPostContent.mdxPostContent} components={components} />;
}

export default MdxContent;
