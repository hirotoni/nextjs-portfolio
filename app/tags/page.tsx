import { PostKey, getAllTags, getSortedMdxPostsKeys } from "../../lib/posts";
import Link from "next/link";
import BlogEntryCard from "../../components/blog-entry/BlogEntryCard";

type Data = {
  allMdxPostsKeys: PostKey[];
  allTagCount: { [tag: string]: number };
};

//  altered from `getStaticProps`. this function can be named anything
async function getData(): Promise<Data> {
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
    allMdxPostsKeys,
    allTagCount,
  };
}

async function Page() {
  const data = await getData();
  return (
    <>
      <div>タグ一覧</div>
      <div className="p-4 rounded-xl mb-2">
        <div className="flex flex-wrap justify-start gap-x-3 leading-10">
          {Object.entries(data.allTagCount).map((tag: [string, number]) => (
            <Link key={tag[0]} href={`/tags/${tag[0]}`}>
              <text className="bg-slate-200 py-1 px-2 rounded-md shadow-md border border-slate-300 text-sm">
                {tag[0]}
                <text className="bg-white rounded-md px-1 ml-1">{tag[1]}</text>
              </text>
            </Link>
          ))}
        </div>
      </div>
      {data.allMdxPostsKeys.map((postKey) => (
        <BlogEntryCard key={`${postKey.date}${postKey.key}`} postKey={postKey} />
      ))}
    </>
  );
}

export default Page;
