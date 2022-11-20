import { allPosts } from "contentlayer/generated";

type Props = {
  params: {
    slug: string;
  };
};

const Head = ({ params }: Props) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  if (!post) {
    return null;
  }
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.summary} />

      <meta property="og:image" content={`/api/og/posts/${post._raw.flattenedPath}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.summary} />
      <meta name="twitter:image" content={`/api/og/posts/${post._raw.flattenedPath}`} />
    </>
  );
};

export default Head;
