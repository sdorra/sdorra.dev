"use client";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { IconButton } from "./icons";

const subscribe = (onStoreChange: () => void) => {
  const observer = new MutationObserver(() => onStoreChange());
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => {
    observer.disconnect();
  };
};

const getSnapshot = () => (document.documentElement.classList.contains("dark") ? "dark" : "light");

const DarkModeToggle = () => {
  const mode = useSyncExternalStore(subscribe, getSnapshot, () => "");

  const onClick = () => {
    const toggle = document.documentElement.classList.toggle("dark");
    const theme = toggle ? "dark" : "light";
    window.localStorage.setItem("theme", theme);
  };

  return (
    <IconButton
      onClick={onClick}
      title={`Enable ${mode} mode`}
      className={clsx("transition-opacity", { "opacity-0": !mode, "opacity-100": !!mode })}
    >
      {mode === "dark" ? <Sun /> : <Moon />}
    </IconButton>
  );
};

export default DarkModeToggle;
