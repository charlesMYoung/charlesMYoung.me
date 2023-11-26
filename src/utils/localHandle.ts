import { join } from "path";
import fs from "fs";
import { compileMd } from "./compileMD";
import { promisify } from "util";
import { dataSource } from "@/types/common";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

async function readDirFiles() {
  const filesPath = join(process.cwd(), "articles");
  let files: string[] = [];
  try {
    files = await readdir(filesPath, {
      encoding: "utf-8",
    });
  } catch (error) {
    console.error(error);
    files = [];
  }

  return files;
}

//读取内容
async function readFileContent(fileName: string) {
  let fileContent = "";
  try {
    fileContent = await readFile(join(process.cwd(), "articles", fileName), {
      encoding: "utf-8",
    });
  } catch (error) {
    console.error(error);
    fileContent = "";
  }
  return fileContent;
}

// 从本地获取文章列表
export const getPostListFromLocal = async () => {
  let allArticles: Post[] = [];

  // 处理本地打包文章读取
  const allFiles = await readDirFiles();

  if (allFiles.length > 0) {
    const allLocals = allFiles.map(async (fileName) => {
      const fileContent = await readFileContent(fileName);
      const { frontmatter } = await compileMd(fileContent);
      if (frontmatter) {
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
          dataSource: dataSource.LOCAL,
        };
      } else {
        return null;
      }
    });
    const results = await Promise.all(allLocals);
    const filteredResults = results.filter(
      (result) => result !== null
    ) as Post[];
    allArticles = filteredResults;
  }
  return allArticles;
};

export async function getLocalPostById(postId: string) {
  const allFiles = await readDirFiles();
  const currentPost =
    allFiles.find(
      (fileName) => fileName === `${decodeURIComponent(postId)}.mdx`
    ) || "";

  if (currentPost) {
    const postContent = await readFileContent(currentPost);
    const { content, frontmatter } = await compileMd(postContent);
    return {
      content,
      frontmatter,
      from: "local",
    };
  }
  return {};
}
