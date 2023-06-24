import { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import Date from "../../../../components/Date";
import { THEME } from "../../../../components/theme";
import { PostKey, getAllMdxPostKeys, getMdxPostContent } from "../../../../lib/posts";
import MdxContent from "./mdx-content";

type Props = {
  params: PostKey;
};

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const mdxPostContent = await getMdxPostContent(params);

  return {
    title: mdxPostContent.title,
    description: mdxPostContent.title,
  };
}

export async function generateStaticParams() {
  const postKeys = getAllMdxPostKeys();
  //transform
  const paths = postKeys.map((postkey) => ({ ...postkey }));
  return paths;
}

async function Page({ params }: Props) {
  const mdxPostContent = await getMdxPostContent(params);
  return (
    <>
      <article>
        <h1 className="text-3xl font-extrabold leading-10 tracking-wide my-4">{mdxPostContent.title}</h1>
        <div className="flex flex-wrap justify-start space-x-2 leading-10">
          {mdxPostContent.tags?.map((tag) => (
            <Link href={`/tags/${tag.toLowerCase()}`} key={tag}>
              <text className="bg-slate-200 py-1 px-2 mb-2 rounded-md shadow-md border border-slate-300 text-sm">
                {tag}
              </text>
            </Link>
          ))}
        </div>
        <div className={THEME.text.sub}>
          <Date dateString={mdxPostContent.date} />
        </div>
        <MdxContent mdxPostContent={mdxPostContent} />
      </article>
    </>
  );
}

export default Page;
