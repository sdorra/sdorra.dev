import clsx from "clsx";
import { allPosts, Post, Post as PostType } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DateTime from "./DateTime";
import Markdown from "./Markdown";
import ScrollToTop from "./ScrollToTop";

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
      <span className="hidden group-hover:underline group-hover:decoration-cyan-500 group-hover:decoration-2 md:block">
        {post.title}
      </span>
    </Link>
  );
};

const Post = ({ post }: Props) => {
  const { next, prev } = createPrevAndNext(post);
  return (
    <>
      <figure className="flex items-center gap-4">
        <Image
          src={post.image}
          width={256}
          height={160}
          alt="Feature blog image"
          className="h-40 w-64 flex-shrink-0 rounded-md border-2 border-zinc-200 object-cover dark:border-zinc-700"
        />
        <h1 className="-ml-52 sm:-ml-32 rounded-md border border-zinc-200 bg-white/80 p-2 text-4xl font-bold dark:border-zinc-700 dark:bg-zinc-800/80">
          {post.title}
        </h1>
      </figure>
      <div className="my-4 flex justify-between text-xs">
        <p>{post.readingTime}</p>
        <DateTime title="Posted at" value={post.date} />
      </div>
      <Markdown code={post.body.code} />
      <nav className="my-5 grid grid-cols-3 place-items-center border-t border-t-zinc-300 pt-4 dark:border-t-zinc-700">
        <NavigationButton type="prev" post={prev} />
        <ScrollToTop />
        <NavigationButton type="next" post={next} />
      </nav>
    </>
  );
};

export default Post;
