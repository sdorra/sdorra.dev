"use client";

import * as Fathom from "fathom-client";
import { useEffect } from "react";

const Analytics = () => {
  useEffect(() => {
    Fathom.load("XBTBKWMG", {
      includedDomains: ["sdorra.dev"],
      url: "https://ice-idea.sdorra.dev/script.js",
    });

    const onRouteChange = () => Fathom.trackPageview();

    window.addEventListener("routeChange", onRouteChange);
    return () => window.removeEventListener("routeChange", onRouteChange);
  }, []);

  return null;
};

export default Analytics;
