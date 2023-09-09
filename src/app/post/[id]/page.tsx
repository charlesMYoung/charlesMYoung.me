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
import { Metadata, ResolvingMetadata } from "next";

async function getLocalPostById(postId: string) {
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
    const { content, frontmatter } = await compileMDX<Post>({
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
      content,
      frontmatter,
      from: "local",
    };
  }
  return {
    frontmatter: {
      title: "",
      id: "",
      description: "",
      is_release: false,
      content: "",
      cover: "",
      release_date: new Date(),
      tags: [""],
    },
  };
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const id = params.id;
  const { frontmatter } = (await getLocalPostById(id)) as { frontmatter: Post };

  return {
    title: frontmatter.title,
    description: frontmatter.description,
  };
}

const PageDetail = async ({ params: { id } }: { params: { id: string } }) => {
  const { content, frontmatter } = await getLocalPostById(id);

  return (
    <div className="w-full px-4 md:px-12">
      <PostDetailCover
        title={frontmatter.title}
        description={frontmatter.description}
        release_date={frontmatter.release_date || new Date()}
        cover={frontmatter.cover}
        tags={frontmatter.tags}
      ></PostDetailCover>
      <div className="container mx-auto prose md:prose-xl pt-12">{content}</div>
    </div>
  );
};

export default PageDetail;
