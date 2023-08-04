/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import allPosts from ".scripts/Post/withoutbody.json";
import { ImageResponse } from "@vercel/og";
import clsx from "clsx";
import { NextRequest } from "next/server";

export const runtime = "edge";

const ralewayBold = fetch(new URL("content/fonts/Raleway-Bold.ttf", import.meta.url)).then((res) => res.arrayBuffer());

const cabinSemiBold = fetch(new URL("content/fonts/Cabin-SemiBold.ttf", import.meta.url)).then((res) =>
  res.arrayBuffer()
);

const cabinMedium = fetch(new URL("content/fonts/Cabin-Medium.ttf", import.meta.url)).then((res) => res.arrayBuffer());

const createImageUrl = (src: string, width: number, height: number) => {
  if (src.startsWith("https://images.unsplash.com/") && !src.includes("?")) {
    return `${src}?fit=crop&w=${width}&h=${height}`;
  }
  return src;
};

type Context = {
  params: {
    slug: string;
  };
};

export const GET = async (request: NextRequest, { params }: Context) => {
  const slug = params.slug;
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
        tw="w-full h-full p-4 flex"
        style={{
          backgroundImage: "linear-gradient(to right, #0891B2, #164E63)",
          fontFamily: '"Cabin"',
        }}
      >
        <div tw="rounded-xl border-2 border-stone-700 w-full h-full p-4 flex bg-stone-800 shadow-lg">
          <img
            width="375"
            height="562"
            src={createImageUrl(post.image, 375, 562)}
            tw="rounded-xl border-2 border-stone-700"
            style={{ objectFit: "cover" }}
          />
          <div tw="flex flex-col px-6 w-[740px] h-full justify-between">
            <div tw="flex flex-col">
              <span
                tw={clsx("font-bold text-stone-50 mb-6", {
                  "text-7xl": post.title.length < 40,
                  "text-6xl": post.title.length >= 40,
                })}
                style={{
                  fontFamily: '"Raleway"',
                }}
              >
                {post.title}
              </span>
              <span tw="text-5xl text-stone-300">{post.summary}</span>
            </div>
            <div tw="flex justify-between items-end w-full text-stone-400 text-xl">
              <span>{post.readingTime}</span>
              <div
                tw="flex text-4xl font-bold"
                style={{
                  fontFamily: '"Raleway"',
                }}
              >
                <span tw="text-stone-50">sdorra</span>
                <span tw="text-orange-400">.dev</span>
              </div>
              <span>{post.date.substring(0, post.date.indexOf("T"))}</span>
            </div>
          </div>
          <div
            tw="w-32 h-32 border-t-2 border-t-stone-700 border-l-2 border-l-stone-700 bg-stone-800 rounded-full absolute left-[324px] bottom-[59px]"
            style={{
              transform: "rotate(-45deg)",
            }}
          />
          <div tw="absolute left-[338px] bottom-[68px] flex items-center">
            <img
              tw="rounded-full border-2 border-stone-700"
              width="110"
              height="110"
              src="https://avatars.githubusercontent.com/u/493333"
            />
            <p tw="ml-6 text-4xl font-semibold text-stone-400">Sebastian Sdorra</p>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      debug: false,
      fonts: [
        {
          name: "Raleway",
          data: await ralewayBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Cabin",
          data: await cabinMedium,
          style: "normal",
          weight: 400,
        },
        {
          name: "Cabin",
          data: await cabinSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
};
