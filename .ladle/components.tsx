import type { GlobalProvider } from "@ladle/react";
import React, { useEffect } from "react";
import "../app/globals.css";

import * as NextImage from "next/image";

const OriginalNextImage = NextImage.default;

Object.defineProperty(NextImage, "default", {
  configurable: true,
  value: (props) => (
    <OriginalNextImage
      {...props}
      unoptimized
    />
  ),
});

export const Provider: GlobalProvider = ({ children, globalState }) => {
  useEffect(() => {
    if (globalState.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [globalState.theme]);
  return <div className="p-4">{children}</div>;
};
