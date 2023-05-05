import Link from "next/link";
import React from "react";
import BlogEntryCard from "../../components/blog-entry/BlogEntryCard";
import Layout from "../../components/layout/Layout";
import { getAllTags, getSortedMdxPostsKeys, PostKey } from "../../lib/posts";

export async function getStaticProps() {
  let allMdxPostsKeys = getSortedMdxPostsKeys();
  const allTags = getAllTags();

  const allTagCount = {};
  allTags.map((tag) => {
    const c = allTagCount[tag];
    if (Number.isInteger(c)) {
      allTagCount[tag] = c + 1;
    } else {
      allTagCount[tag] = 1;
    }
  });

  return {
    props: {
      allMdxPostsKeys,
      allTagCount,
    },
  };
}

type Props = {
  allMdxPostsKeys: PostKey[];
  allTagCount: { [tag: string]: number };
};

const Index = ({ allMdxPostsKeys, allTagCount }: Props) => {
  return (
    <Layout>
      <div>タグ一覧</div>
      <div className="p-4 rounded-xl mb-2">
        <div className="flex flex-wrap justify-start gap-x-3 leading-10">
          {Object.entries(allTagCount).map((tag) => (
            <Link key={tag[0]} href={`/tags/${tag[0]}`}>
              <a>
                <text className="bg-slate-200 py-1 px-2 rounded-md shadow-md border border-slate-300 text-sm">
                  {tag[0]}
                  <text className="bg-white rounded-md px-1 ml-1">{tag[1]}</text>
                </text>
              </a>
            </Link>
          ))}
        </div>
      </div>
      {allMdxPostsKeys.map((postKey) => (
        <BlogEntryCard key={`${postKey.date}${postKey.key}`} postKey={postKey} />
      ))}
    </Layout>
  );
};

export default Index;
