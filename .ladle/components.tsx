import type { GlobalProvider } from "@ladle/react";
import React, { useEffect } from "react";
import "../app/globals.css";

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
