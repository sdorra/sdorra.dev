import { Feed } from "feed";
import { compareDesc, parseISO } from "date-fns";
import { allPosts } from "../.contentlayer/generated/index.mjs";
import { writeFile } from "fs/promises";

const createFeed = () => {
  const feed = new Feed({
    title: "sdorra.dev",
    description: "This are some of my notes polished for a blog",
    id: "https://sdorra.dev",
    link: "https://sdorra.dev",
    language: "en",
    // image: "",
    favicon: "https://sdorra.dev/favicon.ico",
    copyright: "All rights reserved 2022, Sebastian Sdorra",
    feedLinks: {
      atom: "https://sdorra.dev/atom.xml"
    },
    author: {
      name: "Sebastian Sdorra",
      email: "s.sdorra@gmail.com",
      link: "https://sdorra.dev"
    }
  });

  allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))).forEach(post => {
    const url = `https://sdorra.dev/posts/${post._raw.flattenedPath}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.summary,
      author: [
        {
          name: "Sebastian Sdorra",
          email: "s.sdorra@gmail.com",
          link: "https://sdorra.dev"
        }
      ],
      date: parseISO(post.date),
      //image: ""
    });
  });

  return feed.rss2()
};

(async () => {
  console.log(`create feed for ${allPosts.length} paths`);
  const feed = await createFeed();

  await writeFile("./public/rss.xml", feed, { encoding: "utf-8" });
})();
