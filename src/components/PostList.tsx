"use client";
import { Button, Card, CardFooter, CardHeader, Image } from "@nextui-org/react";
import React from "react";

export const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <>
      {posts.map((post: Post) => {
        return (
          <Card
            key={post.id}
            className="w-96 h-[300px] col-span-12 sm:col-span-5"
          >
            <CardHeader>
              <p className="text-tiny text-white/60 uppercase font-bold">New</p>
              <h4 className="text-black font-medium text-2xl"> {post.title}</h4>
            </CardHeader>
            <Image
              src={post.cover}
              alt={post.title}
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
            ></Image>
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">Available soon.</p>
                <p className="text-black text-tiny">Get notified.</p>
              </div>
              <Button
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
              >
                Notify Me
              </Button>
            </CardFooter>
          </Card>
        );
      })}
    </>
  );
};
