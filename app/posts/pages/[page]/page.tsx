import PostCard from "components/PostCard";
import PostsPager from "components/PostsPager";
import createMetadata from "lib/metadata";
import { pages } from "lib/posts";
import { notFound } from "next/navigation";

type Props = {
  params: {
    page: string;
  };
};

const PostsPage = ({ params }: Props) => {
  const pageNumber = Number(params.page) - 1;
  const page = pages[pageNumber];
  if (!page) {
    notFound();
  }
  return (
    <>
      <h2 className="mb-2 text-4xl font-semibold">Posts</h2>
      <p className="text-sm text-stone-500 dark:text-stone-300">
        Page {params.page} of {pages.length}
      </p>
      <section className="space-y-4 pt-4">
        {page.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </section>
      <PostsPager page={pageNumber} />
    </>
  );
};

export const generateStaticParams = async () => {
  return pages.map((_, page) => ({ page: String(page + 1) }));
};

export const generateMetadata = ({ params }: Props) => {
  return createMetadata({
    title: `Posts - Page ${params.page}`,
    description: `Posts - Page ${params.page} of ${pages.length}`,
    image: `/api/og/home`,
    url: `/posts/pages/${params.page}`,
  });
};

export const dynamicParams = false;

export default PostsPage;
