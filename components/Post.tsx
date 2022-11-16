import { Post as PostType } from "contentlayer/generated";
import DateTime from "./DateTime";
import Markdown from "./Markdown";

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => (
  <>
    <h1 className="text-4xl font-bold">{post.title}</h1>
    <div className="mt-2 mb-6 flex justify-between text-xs">
      <p>{post.readingTime}</p>
      <DateTime title="Posted at" value={post.date} />
    </div>
    <Markdown code={post.body.code} />
  </>
);

export default Post;
