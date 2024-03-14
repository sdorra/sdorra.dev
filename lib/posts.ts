import { allPosts } from "content-collections";
import compareDesc from "date-fns/compareDesc";

const PAGE_SIZE = 10;

export const postsOrderedByDate = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

export const homePage = postsOrderedByDate.slice(0, 5);

export const pages = postsOrderedByDate.reduce((pages, post, i) => {
  const pageIndex = Math.floor(i / PAGE_SIZE);
  if (!pages[pageIndex]) {
    pages[pageIndex] = [];
  }
  pages[pageIndex].push(post);
  return pages;
}, [] as typeof postsOrderedByDate[]);

