import PostCard from "components/PostCard";
import PostsPager from "components/PostsPager";
import { pages } from "lib/posts";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    page: string;
  }>;
};

const PostsPage = async ({ params }: Props) => {
  const { page: currentPage } = await params;
  const pageNumber = Number(currentPage) - 1;
  const page = pages[pageNumber];
  if (!page) {
    notFound();
  }
  return (
    <>
      <h2 className="mb-2 text-4xl font-semibold">Posts</h2>
      <p className="text-sm text-stone-500 dark:text-stone-300">
        Page {currentPage} of {pages.length}
      </p>
      <section className="space-y-4 pt-4">
        {page.map((post) => (
          <PostCard key={post.url} post={post} />
        ))}
      </section>
      <PostsPager page={pageNumber} />
    </>
  );
};

export const generateStaticParams = async () => {
  return pages.map((_, page) => ({ page: String(page + 1) }));
};

export const generateMetadata = async ({ params }: Props) => {
  const { page } = await params;

  return {
    title: `Posts - Page ${page}`,
    description: `Posts - Page ${page} of ${pages.length}`,
  };
};

export const dynamicParams = false;

export default PostsPage;
