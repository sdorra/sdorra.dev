import PostCard from "components/PostCard";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import Image from "next/image";

const Home = () => (
  <>
    <div className="mb-5 sm:mb-10">
      <div className="mb-2 flex items-center gap-4">
        <Image
          className="h-16 w-16 flex-shrink-0 rounded-full border-2 border-zinc-400 dark:border-zinc-600 shadow-md sm:h-24 sm:w-24"
          width="96"
          height="96"
          src="https://avatars.githubusercontent.com/u/493333"
          alt="Avatar of Sebastian"
        />
        <div>
          <h1 className="mb-2 text-5xl font-bold sm:text-6xl">
            sdorra<span className="text-cyan-600 dark:text-cyan-400">.dev</span>
          </h1>
          <p className="hidden text-xl sm:block">A site about development by Sebastian Sdorra</p>
        </div>
      </div>
      <p className="text-xl sm:hidden">A site about development by Sebastian Sdorra</p>
    </div>

    <p className="text-xl">
      Welcome to my site. On this page I will share my experiences and learnings on my way as a developer. Most of the
      posts will be about web development, but who knows what I&apos;ll be dealing with next.
    </p>

    <h2 className="mt-10 mb-4 text-4xl font-semibold">Posts</h2>
    <section className="space-y-4">
      {allPosts
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
    </section>
  </>
);

export default Home;
