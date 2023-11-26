import React from "react";
import { PostDetailCover } from "@/components/PostDetailCover";
import { Metadata, ResolvingMetadata } from "next";
import { getLocalPostById } from "@/utils/localHandle";

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
  if (!frontmatter) {
    return <div>404</div>;
  }
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
