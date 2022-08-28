import { run } from "@mdx-js/mdx";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import { MDXComponents } from "mdx/types";
import Head from "next/head";
import { Fragment, useEffect, useState } from "react";
import * as jsxruntime from "react/jsx-runtime";
import Date from "../../../components/Date";
import PostsLayout from "../../../components/layout/PostsLayout";
import {
  A,
  Blockquote,
  Code,
  H1,
  H2,
  H3,
  Img,
  Main,
  Ol,
  P,
  Pre,
  Table,
  Ul,
} from "../../../components/posts/MdxPostComponents";
import { getAllMdxPostKeys, getMdxPostContent, PostKey } from "../../../lib/posts";

// =====================================================
// MDX implementation
// References below:
// https://nextjs.org/docs/advanced-features/using-mdx
// https://mdxjs.com/packages/react/
// =====================================================

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
};

export async function getStaticPaths() {
  const paths = getAllMdxPostKeys();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: PostKey }) {
  const mdxPostContent = await getMdxPostContent(params);

  return {
    props: {
      mdxPostContent,
    },
  };
}

export default function Post({ mdxPostContent }) {
  const [mdxModule, setMdxModule] = useState<any>();
  const MdxPostContent = mdxModule ? mdxModule.default : Fragment;

  useEffect(() => {
    (async () => {
      // DANGER: this run() possively evals JavaScript on client side.
      // In case of injection attack, rehypeSanitize plugin is applied on server side.
      setMdxModule(
        await run(mdxPostContent.compiledCode, {
          ...jsxruntime,
          useMDXComponents,
        })
      );
    })();
  }, [mdxPostContent]);

  return (
    <PostsLayout>
      <Head>
        <title>{mdxPostContent.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-extrabold leading-10 tracking-wide my-4">{mdxPostContent.title}</h1>
        <div className="text-gray-500">
          <Date dateString={mdxPostContent.date} />
        </div>
        <MDXProvider components={components}>
          <MdxPostContent />
        </MDXProvider>
      </article>
    </PostsLayout>
  );
}
