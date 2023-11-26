import { dataSource } from "@/types/common";

export const getPostListFromServer = async () => {
  if (process.env.BLOG_REMOTE_API) {
    const posts = await fetch(
      `${process.env.BLOG_REMOTE_API}/post?page_size=20&page=1`
    ).then((res) => res.json());
    return posts.map((post: Post) => ({
      ...post,
      dataSource: dataSource.SERVER,
    })) as Post[];
  }
  return [];
};
