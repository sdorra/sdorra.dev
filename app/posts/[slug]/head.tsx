import { allPosts } from "contentlayer/generated";

type Props = {
  params: {
    slug: string;
  };
};

const fqdn = process.env.NEXT_PUBLIC_FQDN ? process.env.NEXT_PUBLIC_FQDN : "sdorra.dev";

const Head = ({ params }: Props) => {
  const post = allPosts.find((p) => p._raw.flattenedPath === params.slug);
  if (!post) {
    return null;
  }
  return (
    <>
      <title>{post.title}</title>
      <meta name="description" content={post.summary} />

      <meta name="og:title" content={post.title} />
      <meta name="og:description" content={post.summary} />
      <meta property="og:image" content={`https://${fqdn}/api/og/posts/${post._raw.flattenedPath}`} />
      <meta property="og:type" content="article" />

      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.summary} />
      <meta property="twitter:image" content={`https://${fqdn}/api/og/posts/${post._raw.flattenedPath}`} />
      <meta name="twitter:card" content="summary_large_image" />
    </>
  );
};

export default Head;
