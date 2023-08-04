import "@code-hike/mdx/dist/index.css";
import clsx from "clsx";
import Analytics from "components/Analytics";
import DarkModeToggle from "components/DarkModeToggle";
import { FeedLink, GitHubLink, TwitterLink } from "components/ExternalLinks";
import Navigation from "components/Navigation";
import { baseUrl } from "lib/config";
import { Cabin, Raleway } from "next/font/google";
import { FC, PropsWithChildren } from "react";
import "./globals.css";

const raleway = Raleway({
  variable: "--display-font",
  subsets: ["latin"],
});
const cabin = Cabin({
  variable: "--body-font",
  subsets: ["latin"],
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className="h-full" suppressHydrationWarning={true}>
    <head>
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
    <body
      className={clsx(
        "mx-auto flex h-full min-h-screen max-w-3xl flex-col gap-5 p-5 sm:p-10",
        raleway.variable,
        cabin.variable
      )}
    >
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
      <Analytics />
    </body>
  </html>
);

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "sdorra.dev",
    template: "%s | sdorra.dev",
  },
  creator: "Sebastian Sdorra",
  manifest: "/site.webmanifest",
  alternates: {
    types: {
      "application/rss+xml": "/rss.xml",
    },
  },
  icons: {
    apple: {
      url: "/apple-touch-icon.png",
      type: "image/png",
      sizes: "180x180",
    },
    icon: [
      {
        url: "/favicon-16x16.png",
        type: "image/png",
        sizes: "16x16",
      },
      {
        url: "/favicon-32x32.png",
        type: "image/png",
        sizes: "32x32",
      },
      {
        url: "/favicon-192x192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  },
};

export default RootLayout;
