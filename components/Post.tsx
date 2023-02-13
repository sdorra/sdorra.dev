import clsx from "clsx";
import { allPosts, Post, Post as PostType } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DateTime from "./DateTime";
import Markdown from "./Markdown";
import ScrollToTop from "./ScrollToTop";
import ShareButton from "./ShareButton";

type Props = {
  post: PostType;
};

const createPrevAndNext = (post: Post) => {
  const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  const index = posts.findIndex((p) => p === post);
  const next = index > 0 ? posts[index - 1] : null;
  const prev = index + 1 < posts.length ? posts[index + 1] : null;
  return {
    next,
    prev,
  };
};

type NavigationButtonProps = {
  post: PostType | null;
  type: "prev" | "next";
};

const NavigationButton = ({ post, type }: NavigationButtonProps) => {
  if (!post) {
    return <div />;
  }
  const Icon = type === "next" ? ArrowRightCircle : ArrowLeftCircle;
  return (
    <Link
      className={clsx("group flex w-full items-center justify-start gap-2", {
        "text-left": type === "prev",
        "flex-row-reverse text-right": type === "next",
      })}
      href={`/posts/${post._raw.flattenedPath}`}
      title={`Navigate to post "${post.title}"`}
    >
      <Icon className="w-6 shrink-0 group-hover:stroke-[3]" />
      <span className="hidden group-hover:underline group-hover:decoration-primary-500 group-hover:decoration-2 md:block">
        {post.title}
      </span>
    </Link>
  );
};

const Post = ({ post }: Props) => {
  const { next, prev } = createPrevAndNext(post);
  return (
    <>
      <figure className="relative flex items-center gap-4">
        <Image
          src={post.image}
          blurDataURL={post.imageBlurDataURL}
          placeholder={post.imageBlurDataURL ? "blur" : "empty"}
          width={256}
          height={160}
          alt="Feature blog image"
          className="h-40 w-64 flex-shrink-0 rounded-md border-2 border-base-200 object-cover dark:border-base-700"
        />
        <h1 className="-ml-52 rounded-md border border-base-200 bg-white/80 p-2 text-4xl font-bold dark:border-base-700 dark:bg-base-800/80 sm:-ml-32">
          {post.title}
        </h1>
      </figure>
      <div className="my-4 flex justify-between text-xs">
        <p>{post.readingTime}</p>
        <DateTime title="Posted at" value={post.date} />
      </div>
      <Markdown code={post.body.code} />
      <div className="mt-4 flex justify-between text-sm text-base-500 dark:text-base-400">
        <p>Posted in: {post.tags.join(", ")}</p>
        <ShareButton title={post.title} text={post.summary} url={post.url} />
      </div>
      <nav className="my-5 grid grid-cols-3 place-items-center border-t border-t-base-300 pt-4 dark:border-t-base-700">
        <NavigationButton type="prev" post={prev} />
        <ScrollToTop />
        <NavigationButton type="next" post={next} />
      </nav>
    </>
  );
};

export default Post;
