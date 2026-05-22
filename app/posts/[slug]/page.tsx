import { BlogPostingSchema } from "components/jsonLd";
import Post from "components/Post";
import { allPosts } from "content-collections";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const PostPage = async ({ params }: Props) => {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path === slug);
  if (!post) {
    notFound();
  }

  return (
    <>
      <Post post={post} />
      <BlogPostingSchema post={post} />
    </>
  );
};

export const generateStaticParams = async () => {
  return allPosts.map((post) => ({
    slug: post._meta.path
  }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { slug } = await params;
  const post = allPosts.find((p) => p._meta.path === slug);
  if (!post) {
    return;
  }

  return {
    title: post.title,
    description: post.summary,
  };
};

export const dynamicParams = false;

export default PostPage;
