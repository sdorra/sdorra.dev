import clsx from "clsx";
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
      className={clsx(
        "group mt-10 flex flex-col gap-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-700",
        "border-2 border-zinc-300 p-4 hover:border-cyan-500 dark:border-zinc-700 dark:hover:border-cyan-400"
      )}
    >
      <figure className="flex items-stretch justify-center gap-4 sm:justify-start">
        <Image
          src={post.image}
          alt="Featured Image"
          width={128}
          height={128}
          className={clsx(
            "relative -mt-10 mb-2 h-32 w-32 flex-shrink-0 rounded-md bg-white object-cover  dark:bg-zinc-800 sm:mb-0",
            "border-2 border-zinc-300 group-hover:border-cyan-500 dark:border-zinc-700 dark:group-hover:border-cyan-400"
          )}
        />
        <div className="hidden flex-col justify-between gap-2 sm:inline-flex">
          <h3 className="text-2xl font-semibold">{post.title}</h3>
          <p className="hidden text-lg sm:block">{post.summary}</p>
        </div>
      </figure>
      <h3 className="text-2xl font-semibold sm:hidden">{post.title}</h3>
      <p className="text-lg sm:hidden">{post.summary}</p>
      <footer className="flex justify-between pt-2 text-xs">
        <p>{post.readingTime}</p>
        <DateTime value={post.date} />
      </footer>
    </Link>
  </article>
);

export default PostCard;
