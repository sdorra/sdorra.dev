import { BlogPostingSchema } from "components/jsonLd";
import Post from "components/Post";
import { allPosts } from "content-collections";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const PostPage = ({ params }: Props) => {
  const post = allPosts.find((p) => p._meta.path === params.slug);
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

export const generateMetadata = ({ params }: Props) => {
  const post = allPosts.find((p) => p._meta.path === params.slug);
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
