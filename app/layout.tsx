import { Cabin, Raleway } from "@next/font/google";
import clsx from "clsx";
import { FC, PropsWithChildren } from "react";
import "./globals.css";
import "@code-hike/mdx/dist/index.css"

const raleway = Raleway({
  variable: "--display-font",
});
const merriweather = Cabin({
  variable: "--body-font",
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className="h-full text-zinc-700">
    <head></head>
    <body className={clsx("flex h-full flex-col gap-5 p-10 font-body", raleway.variable, merriweather.variable)}>
      <header>
        <nav></nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="pb-4 text-right">© Sebastian Sdorra</footer>
    </body>
  </html>
);

export default RootLayout;
