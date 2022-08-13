import PostsLayout from "../../../components/layout/PostsLayout";
import { getAllPostKeys, getPostData, PostDetail } from "../../../lib/posts";
import Head from "next/head";
import Date from "../../../components/Date";

// possible values for id(=path) are defined by 'getStaticPaths'
export async function getStaticPaths() {
  const paths = getAllPostKeys();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params);
  return {
    props: {
      postData,
    },
  };
}

type Props = {
  postData: PostDetail;
};

export default function Post({ postData }: Props) {
  return (
    <PostsLayout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className="text-3xl font-extrabold leading-10 tracking-wide my-4">{postData.title}</h1>
        <div className="text-gray-500">
          <Date dateString={postData.postData.date} />
        </div>
        <div className="markdown">
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </article>
    </PostsLayout>
  );
}
