import PostCard from "components/PostCard";
import PostsPager from "components/PostsPager";
import SiteHeading from "components/SiteHeading";
import createMetadata from "lib/metadata";
import { pages } from "lib/posts";

const Home = () => (
  <>
    <SiteHeading isTitle />
    <h2 className="mt-10 mb-4 text-4xl font-semibold">Latest Posts</h2>
    <section className="space-y-4">
      {pages[0]
        .map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
    </section>
    <PostsPager page={0} />
  </>
);

export const generateMetadata = () =>
  createMetadata({
    title: "sdorra.dev",
    description: "A site about software development by Sebastian Sdorra",
    image: "/api/og/home",
  });

export default Home;
