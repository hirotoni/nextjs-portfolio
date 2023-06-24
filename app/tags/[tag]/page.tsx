import { PostKey, getAllTags, getSortedMdxPostsKeys } from "../../../lib/posts";
import BlogEntryCard from "../../../components/blog-entry/BlogEntryCard";

export async function generateStaticParams() {
  const allTags = getAllTags();
  // transform
  const res = allTags.map((tag) => ({ tag }));
  return res;
}

type Props = {
  params: { tag: string };
};

type Data = {
  selectedTag: string;
  allMdxPostsKeys: PostKey[];
};

async function getData(tag: string): Promise<Data> {
  const selectedTag = tag;
  const allMdxPostsKeys = getSortedMdxPostsKeys();
  const filtered = allMdxPostsKeys.filter((x) => x.tags?.map((tag) => tag.toLowerCase()).includes(selectedTag));

  return { selectedTag, allMdxPostsKeys: filtered };
}

async function Page({ params }: Props) {
  const data = await getData(params.tag);

  return (
    <>
      <div>選択したタグの記事</div>
      <div className="p-4 rounded-xl mb-2">
        <div className="leading-10">
          <text className="bg-slate-200 py-1 px-2 mb-2 rounded-md shadow-md border border-slate-300 text-sm">
            {data.selectedTag}
          </text>
        </div>
      </div>
      {data.allMdxPostsKeys.map((postKey) => (
        <BlogEntryCard key={`${postKey.date}${postKey.key}`} postKey={postKey} />
      ))}
    </>
  );
}

export default Page;
