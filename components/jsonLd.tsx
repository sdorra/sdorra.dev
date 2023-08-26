import { Post } from "contentlayer/generated";
import { baseUrl, createCompleteUrl } from "lib/config";
import { Blog, BlogPosting, Person } from "schema-dts";

const author: Person = {
  "@type": "Person",
  name: "Sebastian Sdorra",
  url: baseUrl,
};

const blog: Blog = {
  "@type": "Blog",
  name: "sdorra.dev",
  url: baseUrl,
  image: baseUrl + "/opengraph-image",
  description: "A site about software development by Sebastian Sdorra",
  author,
};

export function BlogSchema() {
  return <JsonLdSchema schema={blog} />;
}

type BlogPostingSchemaProps = {
  post: Post;
};

export function BlogPostingSchema({ post }: BlogPostingSchemaProps) {
  const url = createCompleteUrl(post.url);
  const schema: BlogPosting = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.summary,

    url,
    image: url + "/opengraph-image",

    datePublished: post.date,
    dateCreated: post.date,
    dateModified: post.lastModification,

    author,

    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": baseUrl,
    },
  };
  return <JsonLdSchema schema={schema} />;
}

type JsonLdSchemaProps = {
  schema: object;
};

function JsonLdSchema({ schema }: JsonLdSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...schema,
        }),
      }}
    />
  );
}
