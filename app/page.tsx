import { BlogSchema } from "components/jsonLd";
import PostCard from "components/PostCard";
import PostsPager from "components/PostsPager";
import SiteHeading from "components/SiteHeading";
import { pages } from "lib/posts";

const Home = () => (
  <>
    <SiteHeading isTitle />
    <h2 className="mb-4 mt-10 text-4xl font-semibold">Latest Posts</h2>
    <section className="space-y-4">
      {pages[0].map((post) => (
        <PostCard key={post._meta.filePath} post={post} />
      ))}
    </section>
    <PostsPager page={0} />
    <BlogSchema />
  </>
);

export const metadata = {
  title: "sdorra.dev",
  description: "A site about software development by Sebastian Sdorra",
};

export default Home;
