import React from "react";
import { join } from "path";
import fs from "fs";
import gfm from "remark-gfm";
import math from "remark-math";
import breaks from "remark-breaks";
import highlight from "rehype-highlight";
import gemoji from "remark-gemoji";
import { compileMDX } from "next-mdx-remote/rsc";
import { PostDetailCover } from "@/components/PostDetailCover";

function getLocalPostById(postId: string) {
  const allLocalArticles = fs.readdirSync(join(process.cwd(), "articles"), {
    encoding: "utf-8",
  });

  const currentPost = allLocalArticles.find(
    (fileName) => fileName === `${decodeURIComponent(postId)}.mdx`
  );
  if (currentPost) {
    const fileContent = fs.readFileSync(
      join(process.cwd(), "articles", currentPost),
      {
        encoding: "utf-8",
      }
    );
    return {
      origin: fileContent,
      from: "local",
    };
  }
}

const PageDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const data = getLocalPostById(id);

  const { content, frontmatter } = await compileMDX<Post>({
    source: data?.origin || "",
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [gfm, math, breaks, gemoji],
        rehypePlugins: [highlight],
        format: "mdx",
      },
    },
  });
  return (
    <div className="w-full px-4 md:px-12">
      <PostDetailCover {...frontmatter}></PostDetailCover>
      <div className="container mx-auto prose md:prose-xl pt-12">{content}</div>
    </div>
  );
};

export default PageDetail;
