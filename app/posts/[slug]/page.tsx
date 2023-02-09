import Post from "components/Post";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const PostPage = ({ params }: Props) => {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) {
    notFound();
  }

  return <Post post={post} />;
};

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
};

export const dynamicParams = false;

export default PostPage;
