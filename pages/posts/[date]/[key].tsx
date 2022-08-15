import Head from "next/head";
import Date from "../../../components/Date";
import PostsLayout from "../../../components/layout/PostsLayout";
import { getAllPostKeys, getPostContent, PostContent } from "../../../lib/posts";

// possible values for id(=path) are defined by 'getStaticPaths'
export async function getStaticPaths() {
  const paths = getAllPostKeys();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postContent = await getPostContent(params);
  return {
    props: {
      postContent,
    },
  };
}

type Props = {
  postContent: PostContent;
};

export default function Post({ postContent }: Props) {
  return (
    <PostsLayout>
      <Head>
        <title>{postContent.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-extrabold leading-10 tracking-wide my-4">{postContent.title}</h1>
        <div className="text-gray-500">
          <Date dateString={postContent.date} />
        </div>
        <div className="markdown">
          <div dangerouslySetInnerHTML={{ __html: postContent.contentHtml }} />
        </div>
      </article>
    </PostsLayout>
  );
}
