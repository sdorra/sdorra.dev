import { Post as PostType } from "contentlayer/generated";
import Markdown from "./Markdown";

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => (
  <>
    <h1 className="text-4xl font-bold mb-10">{post.title}</h1>
    <Markdown code={post.body.code} />
  </>
);

export default Post;
