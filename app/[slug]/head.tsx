import Meta from "components/Meta";
import { allPages } from "contentlayer/generated";

type Props = {
  params: {
    slug: string;
  };
};

const Head = ({ params }: Props) => {
  const page = allPages.find((p) => p.slug === params.slug);
  if (!page) {
    return null;
  }
  return (
    <Meta
      title={page.title}
      description={page.description}
      url={page.url}
      ogType="website"
      ogImage={`/api/og/home`}
    />
  );
};

export default Head;
