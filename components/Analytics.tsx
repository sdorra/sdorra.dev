"use client";

import * as Fathom from "fathom-client";
import { useEffect } from "react";

const Analytics = () => {
  useEffect(() => {
    Fathom.load("XBTBKWMG", {
      includedDomains: ["sdorra.dev"],
      spa: "auto",
    });
  }, []);

  return null;
};

export default Analytics;
