import DateTime from "components/DateTime";
import { allPosts } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";

const Home = () => (
  <>
    <h1 className="mb-4 text-6xl font-bold">
      sdorra<span className="text-cyan-600 dark:text-cyan-400">.dev</span>
    </h1>
    <p>This are some of my notes polished for a blog</p>
    <h2 className="mt-10 mb-4 text-4xl font-semibold">Posts</h2>
    <section className="space-y-4">
      {allPosts
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .map((post) => (
          <article key={post._id}>
            <Link
              href={`/posts/${post._raw.flattenedPath}`}
              className="flex flex-col gap-2 rounded-md border-2 p-4 hover:border-cyan-500 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:border-cyan-400 dark:hover:bg-zinc-700"
            >
              <h3 className="text-2xl font-semibold">{post.title}</h3>
              <p className="text-lg">{post.summary}</p>
              <DateTime className="self-end text-xs" value={post.date} />
            </Link>
          </article>
        ))}
    </section>
  </>
);

export default Home;
