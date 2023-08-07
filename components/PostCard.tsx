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
        "group mt-10 grid gap-2 rounded-md hover:bg-base-100 dark:hover:bg-base-700 sm:grid-cols-[8.5rem,1fr]",
        "border-2 border-base-300 p-4 hover:border-primary-500 dark:border-base-700 dark:hover:border-primary-400"
      )}
    >
      <figure className="flex items-stretch justify-center gap-4 sm:row-span-2 sm:justify-start">
        <Image
          src={post.imageURL}
          blurDataURL={post.imageBlurDataURL}
          placeholder={post.imageBlurDataURL ? "blur" : "empty"}
          alt="Featured Image"
          width={256}
          height={128}
          priority={true}
          className={clsx(
            "relative -mt-10 mb-2 h-32 w-64 flex-shrink-0 rounded-md bg-white object-cover dark:bg-base-800 sm:mb-0 sm:w-32",
            "border-2 border-base-300 group-hover:border-primary-500 dark:border-base-700 dark:group-hover:border-primary-400"
          )}
        />
      </figure>
      <h3 className="text-2xl font-semibold">{post.title}</h3>
      <p className="text-lg">{post.summary}</p>
      <footer className="flex justify-between pt-2 text-xs sm:col-span-2">
        <p>{post.readingTime}</p>
        <DateTime value={post.date} />
      </footer>
    </Link>
  </article>
);

export default PostCard;
