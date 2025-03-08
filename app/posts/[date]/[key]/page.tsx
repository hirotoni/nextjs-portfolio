import Link from "next/link";
import Date from "@/components/Date";
import MdxContent from "@/components/posts/MdxContent";
import { THEME } from "@/components/theme";
import { PostKey, getAllMdxPostKeys, getPostContent } from "@/lib/posts";

type Props = {
  params: PostKey;
};

export async function generateStaticParams() {
  const postKeys = getAllMdxPostKeys();
  //transform
  const paths = postKeys.map((postkey) => ({ ...postkey }));
  return paths;
}

async function Page({ params }: Props) {
  const { content, metadata } = await getPostContent(params);
  return (
    <>
      <article>
        <h1 className="text-3xl font-extrabold leading-10 tracking-wide my-4">{metadata.title}</h1>
        <div className="flex flex-wrap justify-start space-x-2 leading-10">
          {metadata.tags?.map((tag) => (
            <Link href={`/tags/${tag.toLowerCase()}`} key={tag}>
              <text className="bg-slate-200 py-1 px-2 mb-2 rounded-md shadow-md border border-slate-300 text-sm">
                {tag}
              </text>
            </Link>
          ))}
        </div>
        <div className={THEME.text.sub}>
          <Date dateString={params.date} />
        </div>
        <MdxContent source={content} />
      </article>
    </>
  );
}

export default Page;
