import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import frontMatter from "remark-frontmatter";
import gfm from "remark-gfm";
import byteMath from "remark-math";
import breaks from "remark-breaks";
import highlight from "rehype-highlight";
import gemoji from "remark-gemoji";

export const MdViewer = ({ markdown = "" }: { markdown: string }) => {
  return (
    <div className="prose md:prose-xl">
      <MDXRemote
        source={markdown}
        options={{
          mdxOptions: {
            remarkPlugins: [gfm, gemoji, breaks, frontMatter, byteMath],
            rehypePlugins: [highlight],
          },
        }}
      />
    </div>
  );
};
