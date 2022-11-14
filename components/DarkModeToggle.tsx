"use client";

import clsx from "clsx";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const DarkModeToggle = () => {
  const [mode, setMode] = useState("");
  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, []);

  const onClick = () => {
    const toggle = document.documentElement.classList.toggle("dark");
    const theme = toggle ? "dark" : "light";
    window.localStorage.setItem("theme", theme);
    setMode(theme);
  };

  return (
    <button
      onClick={onClick}
      title={`Enable ${mode} mode`}
      className={clsx("transition-opacity hover:[&>*]:stroke-[3]", { "opacity-0": !mode, "opacity-100": !!mode })}
    >
      {mode === "dark" ? <Sun /> : <Moon />}
    </button>
  );
};

export default DarkModeToggle;
