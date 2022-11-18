import { Post } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import DateTime from "./DateTime";

type Props = {
  post: Post;
};

const PostCard = ({ post }: Props) => (
  <article>
    <Link
      href={`/posts/${post._raw.flattenedPath}`}
      className="group mt-10 flex flex-col gap-2 rounded-md border-2 border-zinc-300 p-4 hover:border-cyan-500 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:border-cyan-400 dark:hover:bg-zinc-700"
    >
      <figure className="flex items-stretch gap-4">
        <Image
          src={post.image}
          alt="Featured Image"
          width={128}
          height={128}
          className="relative -mt-10 h-32 w-32 flex-shrink-0 rounded-md border-2 border-zinc-300 object-cover group-hover:border-cyan-500 dark:border-zinc-700 dark:group-hover:border-cyan-400"
        />
        <div className="inline-flex flex-col justify-between gap-2">
          <h3 className="text-2xl font-semibold">{post.title}</h3>
          <p className="hidden text-lg sm:block">{post.summary}</p>
        </div>
      </figure>
      <p className="text-lg sm:hidden">{post.summary}</p>
      <footer className="flex justify-between pt-2 text-xs">
        <p>{post.readingTime}</p>
        <DateTime value={post.date} />
      </footer>
    </Link>
  </article>
);

export default PostCard;
