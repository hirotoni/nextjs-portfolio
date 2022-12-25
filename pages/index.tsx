import Head from "next/head";
import { BsFillExclamationTriangleFill, BsTwitter } from "react-icons/bs";
import { GoMarkGithub } from "react-icons/go";
import BlogEntryCard from "../components/blog-entry/BlogEntryCard";
import Heading2 from "../components/Heading2";
import Layout from "../components/layout/Layout";
import { getSortedMdxPostsKeys, PostKey } from "../lib/posts";

export const siteTitle = "hirotoni.com";

export async function getStaticProps() {
  const allMdxPostsKeys = getSortedMdxPostsKeys();
  return {
    props: {
      allMdxPostsKeys,
    },
  };
}

type Props = {
  allMdxPostsKeys: PostKey[];
};

const Home = ({ allMdxPostsKeys }: Props) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {/* <div className="bg-slate-200/40 rounded-md shadow-lg p-2">
        <div className="flex flex-row items-center text-sm space-x-2">
          <div className="text-yellow-500">
            <BsFillExclamationTriangleFill />
          </div>
          <p>準備中... / preparation in progress...</p>
        </div>
      </div> */}
      <Heading2 id="aboutme" headingTitle="About Me" />
      <div>
        <text>Software Engineer</text>
      </div>
      <div className="flex gap-4 mt-2">
        <a className="flex items-center gap-2 border p-2 rounded shadow-md" href="https://github.com/hirotoni">
          <GoMarkGithub />
          <text className="text-teal-500 underline">hirotoni</text>
        </a>
        <a className="flex items-center gap-2 border p-2 rounded shadow-md" href="https://twitter.com/h_tonitoni">
          <BsTwitter />
          <text className="text-teal-500 underline">h_tonitoni</text>
        </a>
      </div>
      <Heading2 id="myworks" headingTitle="My Works" />
      準備中...
      <Heading2 id="posts" headingTitle="Posts" />
      {allMdxPostsKeys.map((postKey) => (
        <BlogEntryCard key={`${postKey.date}${postKey.key}`} postKey={postKey} />
      ))}
    </Layout>
  );
};

export default Home;
