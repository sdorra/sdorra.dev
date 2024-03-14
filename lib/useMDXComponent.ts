import { getMDXComponent } from "mdx-bundler/client";
import React from "react";

export function useMDXComponent(code: string) {
  return React.useMemo(() => getMDXComponent(code), [code]);
}
