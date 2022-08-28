import Head from "next/head";
import { BsFillExclamationTriangleFill, BsTwitter } from "react-icons/bs";
import { GoMarkGithub } from "react-icons/go";
import MdxCard from "../components/blog-entry/MdxCard";
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
      <div className="bg-slate-200/40 rounded-md shadow-lg p-2">
        <div className="flex flex-row items-center text-sm space-x-2">
          <div className="text-yellow-500">
            <BsFillExclamationTriangleFill />
          </div>
          <p>準備中... / preparation in progress...</p>
        </div>
      </div>
      <Heading2 id="aboutme" headingTitle="About Me" />
      <div>
        <p>Software Engineer</p>
      </div>
      <div className="flex flex-row items-center">
        <GoMarkGithub />
        <a className="ml-2 text-teal-500 underline" href="https://github.com/hirotoni">
          hirotoni
        </a>
      </div>
      <div className="flex flex-row items-center">
        <BsTwitter />
        <a className="ml-2 text-teal-500 underline" href="https://twitter.com/h_tonitoni">
          h_tonitoni
        </a>
      </div>
      <Heading2 id="myworks" headingTitle="My Works" />
      準備中...
      <Heading2 id="posts" headingTitle="Posts" />
      {allMdxPostsKeys.map((postKey) => (
        <MdxCard key={`${postKey.date}${postKey.key}`} postKey={postKey} />
      ))}
    </Layout>
  );
};

export default Home;
