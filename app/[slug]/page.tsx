import Markdown from "components/Markdown";
import SiteHeading from "components/SiteHeading";
import { allPages } from "contentlayer/generated";
import { notFound } from "next/navigation";

type Props = {
  params: {
    slug: string;
  };
};

const PostPage = ({ params }: Props) => {
  const page = allPages.find((p) => p.slug === params.slug);
  if (!page) {
    notFound();
  }

  return (
    <>
      <SiteHeading />
      <h1 className="mb-4 text-4xl font-bold">{page.title}</h1>
      <Markdown code={page.body.code} />
    </>
  );
};

export const generateStaticParams = async () => {
  return allPages.map((page) => ({
    slug: page.slug,
  }));
};

export const dynamicParams = false;

export default PostPage;
