import PostCard from "components/PostCard";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

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
          <PostCard key={post._id} post={post} />
        ))}
    </section>
  </>
);

export default Home;
