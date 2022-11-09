import { MDXComponents } from "mdx/types";
import { MDXRemote } from "next-mdx-remote";
import Head from "next/head";
import Date from "../../../components/Date";
import Layout from "../../../components/layout/Layout";
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
  Hr,
} from "../../../components/posts/MdxPostComponents";
import { getAllMdxPostKeys, getMdxPostContent, MdxPostContent, PostKey } from "../../../lib/posts";

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

type Props = {
  mdxPostContent: MdxPostContent;
};

export default function Post({ mdxPostContent }: Props) {
  return (
    <Layout post>
      <Head>
        <title>{mdxPostContent.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-extrabold leading-10 tracking-wide my-4">{mdxPostContent.title}</h1>
        <div className="flex space-x-2 mb-2">
          {mdxPostContent.tags?.map((tag) => (
            <text className="bg-slate-200 py-1 px-2 rounded-md shadow-md border border-slate-300 text-sm">{tag}</text>
          ))}
        </div>
        <div className="text-gray-500">
          <Date dateString={mdxPostContent.date} />
        </div>
        <MDXRemote {...mdxPostContent.mdxPostContent} components={components} />
      </article>
    </Layout>
  );
}
