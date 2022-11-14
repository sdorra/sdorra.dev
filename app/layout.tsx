import "@code-hike/mdx/dist/index.css";
import { Cabin, Raleway } from "@next/font/google";
import clsx from "clsx";
import Analytics from "components/Analytics";
import DarkModeToggle from "components/DarkModeToggle";
import { FeedLink, GitHubLink, TwitterLink } from "components/ExternalLinks";
import Navigation from "components/Navigation";
import Script from "next/script";
import { FC, PropsWithChildren } from "react";
import "./globals.css";

const raleway = Raleway({
  variable: "--display-font",
});
const cabin = Cabin({
  variable: "--body-font",
});

const RootLayout: FC<PropsWithChildren> = ({ children }) => (
  <html lang="en" className="h-full">
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
        "mx-auto flex h-full max-w-3xl flex-col gap-5 bg-white p-5 font-body text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 sm:p-10",
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
      <Script id="onRouteChange">{`
        (function (history) {
          var pushState = history.pushState;
          history.pushState = function(state){
            var result = pushState.apply(history, arguments);
            window.dispatchEvent(new Event("routeChange", state));
            return result;
          };
        })(window.history);
      `}</Script>
    </body>
  </html>
);

export default RootLayout;
