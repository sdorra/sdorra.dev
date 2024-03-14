import { allPosts, Post } from "content-collections";
import { compareDesc, parseISO, setHours } from "date-fns";
import { Feed } from "feed";
import { baseUrl } from "lib/config";
import { createImageUrl } from "lib/images";

const createPostUrl = (url: string) => {
  return url + "?utm_campaign=feed&utm_source=rss2";
};

const createContent = (post: Post, url: string) => `
<img src="${createImageUrl(post.image.url, 1000, 420)}" width="1000" height="420" vspace="3" hspace="8" align="center">
<p>${post.summary}</p>
<p>Read the full article on <a href="${url}">sdorra.dev</a></p>`;

const me = {
  name: "Sebastian Sdorra",
  email: "s.sdorra@gmail.com",
  link: baseUrl,
};

const createFeed = () => {
  const feed = new Feed({
    title: "sdorra.dev",
    description: "A site about software development by Sebastian Sdorra",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    favicon: `${baseUrl}/favicon.ico`,
    copyright: "All rights reserved 2023, Sebastian Sdorra",
    author: me,
  });

  allPosts
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .forEach((post) => {
      const id = `${baseUrl}${post.url}`;
      const url = createPostUrl(id);
      feed.addItem({
        title: post.title,
        id: id,
        link: url,
        description: post.summary,
        content: createContent(post, url),
        author: [me],
        date: setHours(parseISO(post.date), 13),
        category: post.tags.map((name) => ({ name })),
        image: createImageUrl(post.image.url, 256, 256, true),
      });
    });

  return feed.rss2();
};

export const GET = async () => {
  const feed = await createFeed();
  return new Response(feed, {
    status: 200,
    headers: {
      "Content-Type": "application/xml",
    },
  });
};
