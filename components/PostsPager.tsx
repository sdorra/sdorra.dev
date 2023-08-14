import { pages } from "lib/posts";
import Pager from "./Pager";

const PostHrefFactory = (page: number) => `/posts/pages/${page}`;

type Props = {
  page: number;
};

const PostsPager = ({ page }: Props) => {
  return <Pager page={page} pages={pages} hrefFactory={PostHrefFactory} className="mt-5" />;
};

export default PostsPager;
