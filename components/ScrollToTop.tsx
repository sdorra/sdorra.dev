"use client";

import { ArrowUpCircle } from "lucide-react";

const ScrollToTop = () => {
  const scrollToTop = () => window.scroll({ top: 0, behavior: "smooth" });
  return (
    <button className="w-6 shrink-0 text-center" title="Scroll back to the top" onClick={scrollToTop}>
      <ArrowUpCircle className="hover:stroke-[3]" />
    </button>
  );
};

export default ScrollToTop;
