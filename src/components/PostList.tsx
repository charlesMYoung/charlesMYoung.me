"use client";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Image,
} from "@nextui-org/react";
import React from "react";
import NextLink from "next/link";
import { twClass } from "@/utils/tw";
import { BsTagsFill } from "react-icons/bs";

export const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts.map((post: Post) => {
        return (
          <Card
            key={post.id}
            isPressable
            as={NextLink}
            href={`/post/${post.id}`}
          >
            <CardHeader className="text-primary-500 text-3xl">
              {post.title}
            </CardHeader>
            <CardBody>
              <Image
                src={post.cover}
                alt={post.title}
                removeWrapper
                width={"100%"}
                className="w-full h-full"
              ></Image>
            </CardBody>
            <CardFooter className={twClass("z-10 flex-col items-start")}>
              <div className="text-default-500 mb-4">{post.description}</div>
              <div className="text-primary-500 space-x-2">
                {Array.isArray(post.tags) &&
                  post.tags.map((tag, index) => {
                    return (
                      <Chip
                        key={index}
                        variant="shadow"
                        startContent={
                          <BsTagsFill className="text-default-500 "></BsTagsFill>
                        }
                      >
                        {tag}
                      </Chip>
                    );
                  })}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};
