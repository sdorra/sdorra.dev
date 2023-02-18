import Post from "components/Post";
import { allPosts } from "contentlayer/generated";
import createMetadata from "lib/metadata";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const PostPage = ({ params }: Props) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  if (!post) {
    notFound();
  }

  return <Post post={post} />;
};

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post._raw.flattenedPath,
  }));
};

export const generateMetadata = ({ params }: Props) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  if (!post) {
    return;
  }

  return createMetadata({
    title: post.title,
    description: post.summary,
    url: post.url,
    image: `/api/og/posts/${post._raw.flattenedPath}`,
    type: "article",
  });
};

export const dynamicParams = false;

export default PostPage;
