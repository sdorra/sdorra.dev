import Meta from "components/Meta";
import { allPosts } from "contentlayer/generated";

type Props = {
  params: {
    slug: string;
  };
};

const Head = ({ params }: Props) => {
  const post = allPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return null;
  }
  return (
    <Meta
      title={post.title}
      description={post.summary}
      url={post.url}
      ogType="article"
      ogImage={`/api/og/posts/${post.slug}`}
    />
  );
};

export default Head;
