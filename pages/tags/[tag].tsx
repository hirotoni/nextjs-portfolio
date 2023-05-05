import React from "react";
import BlogEntryCard from "../../components/blog-entry/BlogEntryCard";
import Layout from "../../components/layout/Layout";
import { getAllTags, getSortedMdxPostsKeys, PostKey } from "../../lib/posts";

export async function getStaticPaths() {
  const allTags = getAllTags();
  // transform
  const paths = allTags.map((tag) => ({ params: { tag } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { tag: string } }) {
  const selectedTag = params.tag;
  let allMdxPostsKeys = getSortedMdxPostsKeys();

  allMdxPostsKeys = allMdxPostsKeys.filter((x) => {
    const tags = x.tags.map((x) => x.toLowerCase());
    return tags.includes(selectedTag);
  });

  return {
    props: {
      selectedTag,
      allMdxPostsKeys,
    },
  };
}

type Props = {
  selectedTag: string;
  allMdxPostsKeys: PostKey[];
};

const Index = ({ selectedTag, allMdxPostsKeys }: Props) => {
  return (
    <Layout>
      <div>選択したタグの記事</div>
      <div className="p-4 rounded-xl mb-2">
        <div className="leading-10">
          <text className="bg-slate-200 py-1 px-2 mb-2 rounded-md shadow-md border border-slate-300 text-sm">
            {selectedTag}
          </text>
        </div>
      </div>
      {allMdxPostsKeys.map((postKey) => (
        <BlogEntryCard key={`${postKey.date}${postKey.key}`} postKey={postKey} />
      ))}
    </Layout>
  );
};

export default Index;
