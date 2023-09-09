"use client";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import React from "react";
import NextLink from "next/link";
import { formatDate } from "@/utils/time";
import { twClass } from "@/utils/tw";

export const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts.map((post: Post) => {
        return (
          <Card
            className="flex flex-row"
            key={post.id}
            isPressable
            as={NextLink}
            href={`/post/${post.id}`}
          >
            <CardBody className="p-0">
              <Image
                src={post.cover}
                alt={post.title}
                width="100%"
                className="z-0 w-full h-full object-cover"
              ></Image>
            </CardBody>
            <CardFooter
              className={twClass(
                "z-10",
                "sm:absolute sm:flex sm:justify-center sm:flex-col sm:h-full sm:space-y-4"
              )}
            >
              <p className="text-default-500 text-large sm:text-3xl">
                {post.title}
              </p>
              <p className="text-primary-500">
                {formatDate(post.release_date)}
              </p>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};
