import gfm from "remark-gfm";
import math from "remark-math";
import breaks from "remark-breaks";
import highlight from "rehype-highlight";
import frontmatter from "remark-frontmatter";
import gemoji from "remark-gemoji";

import mdx from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config belowa
  reactStrictMode: true,
  output: "standalone",
};

const withMDX = mdx({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [frontmatter, gfm, math, breaks, gemoji],
    rehypePlugins: [highlight],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});

export default withMDX(nextConfig);
