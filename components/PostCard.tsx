import { Post } from "contentlayer/generated";
import Link from "next/link";
import DateTime from "./DateTime";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => (
  <article>
    <Link
      href={`/posts/${post._raw.flattenedPath}`}
      className="flex flex-col gap-2 rounded-md border-2 p-4 hover:border-cyan-500 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:border-cyan-400 dark:hover:bg-zinc-700"
    >
      <h3 className="text-2xl font-semibold">{post.title}</h3>
      <p className="text-lg">{post.summary}</p>
      <footer className="flex justify-between pt-2 text-xs">
        <p>{post.readingTime}</p>
        <DateTime value={post.date} />
      </footer>
    </Link>
  </article>
);

export default PostCard;
