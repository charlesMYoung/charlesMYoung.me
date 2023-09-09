import { join } from "path";
import fs from "fs";
import React from "react";
import { PostList } from "@/components/PostList";
import { compileMDX } from "next-mdx-remote/rsc";
import gfm from "remark-gfm";
import math from "remark-math";
import breaks from "remark-breaks";
import highlight from "rehype-highlight";
import gemoji from "remark-gemoji";

const getPost = async () => {
  let allArticles: any = [];

  // 处理本地打包文章读取
  const allLocalArticles = fs.readdirSync(join(process.cwd(), "articles"), {
    encoding: "utf-8",
  });

  if (Array.isArray(allLocalArticles) && allLocalArticles.length > 0) {
    const allLocals = allLocalArticles.map(async (fileName) => {
      const fileContent = fs.readFileSync(
        join(process.cwd(), "articles", fileName),
        {
          encoding: "utf-8",
        }
      );
      const { frontmatter } = await compileMDX<Post>({
        source: fileContent || "",
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
        id: fileName.replace(/\.mdx?$/, ""),
        title: frontmatter.title,
        description: frontmatter.description,
        cover: frontmatter.cover || "",
        is_release: frontmatter.is_release,
        release_date: frontmatter.release_date,
        category: frontmatter.category,
        created_at: frontmatter.created_at,
        tags: frontmatter.tags,
        from: "local",
      };
    });
    const results = await Promise.all(allLocals);
    allArticles = [...results];
  }
  return allArticles;
};

export default async function page() {
  const allPosts = await getPost();
  return (
    <div className="container mx-auto items-stretch mt-8 px-4 ">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 xl:gap-4 2xl:grid-cols-4 2xl:gap-4">
        <PostList posts={allPosts} />
      </div>
    </div>
  );
}
