/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { allPosts } from "contentlayer/generated";
import { NextRequest } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

const Image = async (req: NextRequest) => {
  const slug = req.nextUrl.pathname.replace("/api/og/posts/", "");
  const post = allPosts.find((p) => slug === p._raw.flattenedPath);
  if (!post) {
    return new Response(
      JSON.stringify({
        message: "Could not find post with slug: " + slug,
      }),
      {
        status: 404,
      }
    );
  }

  return new ImageResponse(
    (
      <div
        tw="w-full h-full p-8 flex"
        style={{
          backgroundImage: "linear-gradient(to right, #0891B2, #164E63)"
        }}
      >
        <div tw="rounded-xl border-2 border-zinc-700 w-full h-full p-4 flex bg-zinc-800 shadow-lg">

          <div tw="flex flex-col px-6 w-[740px] h-full justify-between">
            <div tw="flex flex-col">
              <span
                tw="text-7xl font-bold text-zinc-50 mb-6"
              >
                {post.title}
              </span>
              <span tw="text-5xl text-zinc-300">{post.summary}</span>
            </div>
            <div tw="flex justify-between items-end w-full text-zinc-400 text-xl">
              <span>{post.readingTime}</span>
              <div>sdorra.dev</div>
              <span>{post.date.substring(0, post.date.indexOf("T"))}</span>
            </div>
          </div>
          <div
            tw="w-32 h-32 border-t-2 border-t-zinc-700 border-l-2 border-l-zinc-700 bg-zinc-800 rounded-full absolute left-[324px] bottom-[59px]"
            style={{
              transform: "rotate(-45deg)",
            }}
          />
          <div tw="absolute left-[338px] bottom-[68px] flex items-center">
            <p tw="ml-6 text-4xl font-semibold text-zinc-400">Sebastian Sdorra</p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 675,
      debug: false,
    }
  );
};

export default Image;
