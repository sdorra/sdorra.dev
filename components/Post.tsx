import { Post as PostType } from "contentlayer/generated";
import Markdown from "./Markdown";
import PageTitle from "./PageTitle";

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => (
  <>
    <PageTitle>{post.title}</PageTitle>
    <Markdown code={post.body.code} />
  </>
);

export default Post;
