/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

export const config = {
  runtime: "edge",
};

const ralewayBold = fetch(new URL(`../../../content/fonts/Raleway-Bold.ttf`, import.meta.url)).then((res) =>
  res.arrayBuffer()
);

const cabinSemiBold = fetch(new URL(`../../../content/fonts/Cabin-SemiBold.ttf`, import.meta.url)).then((res) =>
  res.arrayBuffer()
);

const cabinMedium = fetch(new URL(`../../../content/fonts/Cabin-Medium.ttf`, import.meta.url)).then((res) =>
  res.arrayBuffer()
);

const Image = async () => {
  return new ImageResponse(
    (
      <div
        tw="w-full h-full p-4 flex justify-center items-center relative"
        style={{
          background: "radial-gradient(circle, rgba(82,82,91,1) 0%, rgba(24,24,27,1) 75%, rgba(24,24,27,1) 100%)",
        }}
      >
        <div tw="flex flex-col justify-center items-center">
          <div
            tw="flex text-[10rem] font-bold"
            style={{
              fontFamily: '"Raleway"',
            }}
          >
            <span tw="text-zinc-50">sdorra</span>
            <span tw="text-cyan-400">.dev</span>
          </div>
        </div>
        <div tw="absolute bottom-8 flex flex-col items-center justify-center">
          <p tw="text-xl text-zinc-200">A blog about web development by</p>
          <div tw="flex items-center justify-center w-full">
            <img
              tw="rounded-full border-2 border-zinc-700"
              width="72"
              height="72"
              src="https://avatars.githubusercontent.com/u/493333"
            />
            <p tw="ml-4 text-4xl font-semibold text-zinc-200 text-center">Sebastian Sdorra</p>
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

export default Image;
