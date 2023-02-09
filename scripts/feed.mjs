import { compareDesc, parseISO, setHours } from "date-fns";
import { Feed } from "feed";
import { writeFile } from "fs/promises";
import { allPosts } from "../.contentlayer/generated/index.mjs";

const createImageUrl = (src, width, height, escape = false) => {
  if (src.startsWith("https://images.unsplash.com/") && !src.includes("?")) {
    const amp = escape ? "&amp;" : "&";
    return `${src}?fit=crop${amp}w=${width}${amp}h=${height}`;
  }
  return src;
};

const createPostUrl = (url) => {
  return url + "?utm_campaign=feed&utm_source=rss2";
};

const createContent = (post, url) => `
<img src="${createImageUrl(post.image, 1000, 420)}" width="1000" height="420" vspace="3" hspace="8" align="center">
<p>${post.summary}</p>
<p>Read the full article on <a href="${url}">sdorra.dev</a></p>`;

const createFeed = () => {
  const feed = new Feed({
    title: "sdorra.dev",
    description: "This are some of my notes polished for a blog",
    id: "https://sdorra.dev",
    link: "https://sdorra.dev",
    language: "en",
    favicon: "https://sdorra.dev/favicon.ico",
    copyright: "All rights reserved 2022, Sebastian Sdorra",
    author: {
      name: "Sebastian Sdorra",
      email: "s.sdorra@gmail.com",
      link: "https://sdorra.dev",
    },
  });

  allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .forEach((post) => {
      const id = `https://sdorra.dev${post.url}`;
      const url = createPostUrl(id);
      feed.addItem({
        title: post.title,
        id: id,
        link: url,
        description: post.summary,
        content: createContent(post, url),
        author: [
          {
            name: "Sebastian Sdorra",
            email: "s.sdorra@gmail.com",
            link: "https://sdorra.dev",
          },
        ],
        date: setHours(parseISO(post.date), 13),
        category: post.tags.map((name) => ({ name })),
        image: createImageUrl(post.image, 256, 256, true),
      });
    });

  return feed.rss2();
};

(async () => {
  console.log(`create feed for ${allPosts.length} paths`);
  const feed = await createFeed();

  await writeFile("./public/rss.xml", feed, { encoding: "utf-8" });
})();
