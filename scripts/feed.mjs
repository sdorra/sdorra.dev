import { compareDesc, parseISO, setHours } from "date-fns";
import { Feed } from "feed";
import { writeFile } from "fs/promises";
import { allPosts } from "../.contentlayer/generated/index.mjs";

const createImageUrl = (src, width, height) => {
  if (src.startsWith("https://images.unsplash.com/") && !src.includes("?")) {
    return `${src}?fit=crop&amp;w=${width}&amp;h=${height}`;
  }
  return src;
};

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
      atom: "https://sdorra.dev/atom.xml",
    },
    author: {
      name: "Sebastian Sdorra",
      email: "s.sdorra@gmail.com",
      link: "https://sdorra.dev",
    },
  });

  allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .forEach((post) => {
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
            link: "https://sdorra.dev",
          },
        ],
        date: setHours(parseISO(post.date), 13),
        category: post.tags.map((name) => ({ name })),
        // 1000x420 is best for dev.to
        // https://dev.to/p/editor_guide
        image: { url: createImageUrl(post.image, 1000, 420) },
      });
    });

  return feed.rss2();
};

(async () => {
  console.log(`create feed for ${allPosts.length} paths`);
  const feed = await createFeed();

  await writeFile("./public/rss.xml", feed, { encoding: "utf-8" });
})();
