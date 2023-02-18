import "@code-hike/mdx/dist/index.css";
import { Cabin, Raleway } from "next/font/google";
import clsx from "clsx";
import Analytics from "components/Analytics";
import DarkModeToggle from "components/DarkModeToggle";
import { FeedLink, GitHubLink, TwitterLink } from "components/ExternalLinks";
import Navigation from "components/Navigation";
import { FC, PropsWithChildren } from "react";
import "./globals.css";

const raleway = Raleway({
  variable: "--display-font",
});
const cabin = Cabin({
  variable: "--body-font",
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className="h-full" suppressHydrationWarning={true}>
    <head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="alternate" type="application/rss+xml" title="sdorra.dev rss feed" href="/rss.xml" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
          `,
        }}
      />
    </head>
    <body className={clsx(raleway.variable, cabin.variable)}>
      <div className="mx-auto flex h-full max-w-3xl flex-col gap-5 p-5 sm:p-10">
        <header className="relative">
          <Navigation />
          <div className="absolute right-0 top-0 flex gap-2">
            <GitHubLink />
            <TwitterLink />
            <FeedLink />
            <DarkModeToggle />
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="pb-4 text-right">© Sebastian Sdorra</footer>
      </div>
      <Analytics />
    </body>
  </html>
);

export default RootLayout;
