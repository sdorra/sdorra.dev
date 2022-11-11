import { allPosts } from "contentlayer/generated";
import { compareDesc, format, parseISO } from "date-fns";
import Link from "next/link";

const Home = () => (
  <main>
    <h1 className="mb-4 text-6xl font-bold">sdorra.dev</h1>
    <p>This are some of my notes polished for a blog</p>
    <h2 className="mt-10 mb-4 text-4xl font-semibold">Posts</h2>
    <ul className="space-y-4">
      {allPosts
        .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
        .map((post) => (
          <li key={post._id}>
            <Link href={`/posts/${post._raw.flattenedPath}`} className="block rounded-md border p-4 hover:bg-zinc-100">
              <h3 className="text-2xl font-semibold">{post.title}</h3>
              <p className="text-lg">{post.summary}</p>
              <time className="text-xs" dateTime={post.date}>{format(parseISO(post.date), 'yyyy-MM-dd')}</time>
            </Link>
          </li>
        ))}
    </ul>
  </main>
);

export default Home;
