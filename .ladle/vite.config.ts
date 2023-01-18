import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "next/original-image": require.resolve('next/image'),
      "next/image": path.resolve(__dirname, "./UnoptimizedImage.tsx"),
    },
  },
  define: {
    "process.env": process.env,
  },
});
