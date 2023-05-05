import Head from "next/head";
import { BsTwitter } from "react-icons/bs";
import { GoMarkGithub } from "react-icons/go";
import BlogEntryCard from "../components/blog-entry/BlogEntryCard";
import Heading2 from "../components/Heading2";
import Layout from "../components/layout/Layout";
import TechStacks from "../components/TechStacks";
import { THEME } from "../components/theme";
import { getSortedMdxPostsKeys, PostKey } from "../lib/posts";

export const SITE_TITLE = "hirotoni.com";
const URLS = {
  github: "https://github.com/hirotoni",
  twitter: "https://twitter.com/h_tonitoni",
};

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
        <title>{SITE_TITLE}</title>
      </Head>
      <Heading2 id="aboutme" headingTitle="About Me" />
      <div>
        <text>Software Engineer</text>
      </div>
      <div className="flex gap-4 mt-2">
        <a href={URLS.github} target="_blank">
          <div
            className={`flex items-center gap-2 border p-2 rounded shadow-md cursor-pointer hover:${THEME.bg.hover}`}
          >
            <GoMarkGithub />
            <text className={`${THEME.text.main} underline`}>hirotoni</text>
          </div>
        </a>
        <a href={URLS.twitter} target="_blank">
          <div
            className={`flex items-center gap-2 border p-2 rounded shadow-md cursor-pointer hover:${THEME.bg.hover}`}
          >
            <BsTwitter />
            <text className={`${THEME.text.main} underline`}>h_tonitoni</text>
          </div>
        </a>
      </div>
      <TechStacks />
      <Heading2 id="posts" headingTitle="Posts" />
      {allMdxPostsKeys.map((postKey) => (
        <BlogEntryCard key={`${postKey.date}${postKey.key}`} postKey={postKey} />
      ))}
    </Layout>
  );
};

export default Home;
