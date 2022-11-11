"use client";

// TODO can we extract the code components (Code Hike)
// and make only them to client components and rest keeps rsc?

import { Post as PostType } from "contentlayer/generated";
import { useMDXComponent } from "next-contentlayer/hooks";

type Props = {
  post: PostType;
};

const Post = ({ post }: Props) => {
  const MDXComponent = useMDXComponent(post.body.code);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">{post.title}</h1>
      <div className="prose prose-zinc">
        <MDXComponent />
      </div>
    </div>
  );
};

export default Post;
