import { join } from "path";
import fs from "fs";
import React from "react";
import { PostList } from "@/components/PostList";
import { getPostListFromLocal } from "@/utils/localHandle";

export default async function page() {
  const allPosts = await getPostListFromLocal();
  return (
    <div className="container mx-auto items-stretch mt-8 px-4">
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 xl:grid-cols-3 xl:gap-4 2xl:grid-cols-4 2xl:gap-4">
        <PostList posts={allPosts} />
      </div>
    </div>
  );
}
