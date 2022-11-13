import "@code-hike/mdx/dist/index.css";
import { Cabin, Raleway } from "@next/font/google";
import clsx from "clsx";
import Analytics from "components/Analytics";
import Navigation from "components/Navigation";
import Link from "next/link";
import Script from "next/script";
import { FC, PropsWithChildren } from "react";
import "./globals.css";

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
        <Navigation />
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
