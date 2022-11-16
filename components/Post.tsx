import clsx from "clsx";
import { allPosts, Post, Post as PostType } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
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
      className={clsx("flex w-full items-center justify-start gap-2 group", {
        "text-left": type === "prev",
        "flex-row-reverse text-right": type === "next",
      })}
      href={`/posts/${post._raw.flattenedPath}`}
      title={`Navigate to post "${post.title}"`}
    >
      <Icon className="w-6 shrink-0 group-hover:stroke-[3]" />
      <span className="hidden md:block group-hover:underline group-hover:decoration-2 group-hover:decoration-cyan-500">{post.title}</span>
    </Link>
  );
};

const Post = ({ post }: Props) => {
  const { next, prev } = createPrevAndNext(post);
  return (
    <>
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <div className="mt-2 mb-6 flex justify-between text-xs">
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
