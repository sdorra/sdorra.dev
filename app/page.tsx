import PostCard from "components/PostCard";
import SiteHeading from "components/SiteHeading";
import { allPosts } from "contentlayer/generated";
import { compareDesc } from "date-fns";

const Home = () => (
  <>
    <SiteHeading isTitle />
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
