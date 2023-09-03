import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import React from "react";
import { PostList } from "@/components/PostList";

const getPost = () => {
  let allArticles: any = [];

  // 处理本地打包文章读取
  const allLocalArticles = fs.readdirSync(join(process.cwd(), "articles"), {
    encoding: "utf-8",
  });

  if (Array.isArray(allLocalArticles) && allLocalArticles.length > 0) {
    const allLocals = allLocalArticles.map((fileName) => {
      const fileContent = fs.readFileSync(
        join(process.cwd(), "articles", fileName),
        {
          encoding: "utf-8",
        }
      );
      const id = Math.random().toString(32).slice(2);
      const mdContent = matter(fileContent);
      const postMeta = mdContent.data as Post;
      return {
        id: "lo_" + id,
        title: postMeta.title,
        description: postMeta.description,
        cover: postMeta.cover || "",
        is_release: postMeta.is_release,
        release_date: postMeta.release_date,
        category: postMeta.category,
        created_at: postMeta.created_at,
        content: mdContent.content,
        tags: postMeta.tags,
        slug: fileName.replace(/\.mdx?$/, ""),
        from: "local",
      };
    });
    allArticles = [...allLocals];
  }
  return allArticles;
};

export default function page() {
  const allPosts = getPost();
  return (
    <div className="mx-auto container">
      <PostList posts={allPosts}></PostList>
    </div>
  );
}
