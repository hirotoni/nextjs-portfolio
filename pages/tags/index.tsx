import Link from "next/link";
import React from "react";
import BlogEntryCard from "../../components/blog-entry/BlogEntryCard";
import Layout from "../../components/layout/Layout";
import { getAllTags, getSortedMdxPostsKeys, PostKey } from "../../lib/posts";

export async function getStaticProps() {
  let allMdxPostsKeys = getSortedMdxPostsKeys();
  const allTags = getAllTags();
  const aaaa = allTags.map((x) => x.params.tag);
  const bbbb = Array.from(new Set(aaaa));

  return {
    props: {
      allMdxPostsKeys,
      allTags: bbbb,
    },
  };
}

type Props = {
  allMdxPostsKeys: PostKey[];
  allTags: string[];
};

const Index = ({ allMdxPostsKeys, allTags }: Props) => {
  return (
    <Layout>
      <div>タグ一覧</div>
      <div className="flex flex-wrap justify-start space-x-2 leading-10">
        {allTags.map((tag) => (
          <Link key={tag} href={`/tags/${tag}`}>
            <a>
              <text className="bg-slate-200 py-1 px-2 rounded-md shadow-md border border-slate-300 text-sm">{tag}</text>
            </a>
          </Link>
        ))}
      </div>

      {allMdxPostsKeys.map((postKey) => (
        <BlogEntryCard key={`${postKey.date}${postKey.key}`} postKey={postKey} />
      ))}
    </Layout>
  );
};

export default Index;
