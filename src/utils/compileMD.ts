import { compileMDX } from "next-mdx-remote/rsc";
import gfm from "remark-gfm";
import math from "remark-math";
import breaks from "remark-breaks";
import highlight from "rehype-highlight";
import gemoji from "remark-gemoji";

export const compileMd = async (sourceMD: string) => {
  try {
    const { frontmatter, content } = await compileMDX<Post>({
      source: sourceMD || "",
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [gfm, math, breaks, gemoji],
          rehypePlugins: [highlight],
          format: "mdx",
        },
      },
    });
    return {
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};
