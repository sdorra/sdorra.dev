import Post from "components/Post";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  }
}

const PostPage = ({ params }: Props) => {
  const post = allPosts.find(p => p._raw.flattenedPath === params.slug);
  if (!post) {
    notFound();
  }

  return <Post post={post} />
}

export default PostPage;
