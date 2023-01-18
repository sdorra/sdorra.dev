import React from "react";
// @ts-ignore have a look in vite.config.ts
import OriginalImage from "next/original-image";

const UnoptimizedImage = (props: any) => {
  return <OriginalImage {...props} unoptimized />;
};

export default UnoptimizedImage;
