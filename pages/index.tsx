import Head from "next/head";
import Card from "../components/blog-entry/Card";
import Layout from "../components/layout/Layout";
import Heading2 from "../components/Heading2";
import { getSortedPostsData, PostData } from "../lib/posts";
import { GoMarkGithub } from "react-icons/go";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

export const siteTitle = "hirotoni.com";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

type Props = {
  allPostsData: PostData[];
};

const Home = ({ allPostsData }: Props) => {
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
        <p></p>
      </div>
      <div className="flex flex-row items-center">
        <GoMarkGithub />
        <a className="ml-2 text-teal-500 underline" href="https://github.com/hirotoni">
          Github
        </a>
      </div>
      <Heading2 id="myworks" headingTitle="My Works" />
      準備中...
      <Heading2 id="posts" headingTitle="Posts" />
      {allPostsData.map((postData) => (
        <Card key={postData.id} postData={postData} />
      ))}
    </Layout>
  );
};

export default Home;
