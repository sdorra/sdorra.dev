import PostCard from "components/PostCard";
import SiteHeading from "components/SiteHeading";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

const Home = () => (
  <>
    <SiteHeading />

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
