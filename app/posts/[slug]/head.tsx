import Meta from "components/Meta";
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
    <Meta
      title={post.title}
      description={post.summary}
      url={`/posts/${post._raw.flattenedPath}`}
      ogType="article"
      ogImage={`/api/og/posts/${post._raw.flattenedPath}`}
    />
  );
};

export default Head;
