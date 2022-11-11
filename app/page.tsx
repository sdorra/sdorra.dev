import { allPosts } from "contentlayer/generated";
import Link from "next/link";

const Home = () => (
  <main>
    <h1 className="text-6xl font-bold mb-4">sdorra.dev</h1>
    <p>This are some of my notes polished for a blog</p>
    <h2 className="text-4xl mt-10 mb-4 font-semibold">Posts</h2>
    <ul className="space-y-4">
      {allPosts.map((post) => (
        <li key={post._id}>
          <Link href={`/posts/${post._raw.flattenedPath}`} className="border block p-4 rounded-md hover:bg-zinc-100">
            <h3 className="text-2xl font-semibold">{post.title}</h3>
            <p className="text-lg">{post.summary}</p>
            <time className="text-xs">{post.date}</time>
          </Link>
        </li>
      ))}
    </ul>
  </main>
);

export default Home;
