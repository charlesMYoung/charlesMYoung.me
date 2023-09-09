"use client";
import { Card, CardFooter, Chip, Image } from "@nextui-org/react";
import React from "react";
import { FaRegCalendarTimes } from "react-icons/fa";
import { BsTagsFill } from "react-icons/bs";
import { formatDate } from "@/utils/time";

export interface PostDetail {
  title: string;
  description: string;
  cover: string;
  release_date: Date;
  tags?: string[];
}

export const PostDetailCover = ({
  title,
  description,
  cover,
  release_date,
  tags,
}: PostDetail) => {
  return (
    <div>
      <Card className="h-60 sm:h-80 md:h-96 lg:h-[32rem]">
        <Image src={cover} alt={title} removeWrapper></Image>
        <div
          className="absolute top-0 z-10 right-0 flex h-full w-full
             flex-col items-center justify-center md:items-start box-border p-14"
        >
          <h1 className="text-gray-100 text-4xl bottom-2 md:text-6xl lg:text-8xl">
            {title}
          </h1>
          <h4 className="text-gray-200 mt-2 text-xl md:text-4xl">
            {description}
          </h4>
        </div>
        <CardFooter className="absolute bottom-1 z-10 justify-between">
          <div className="flex items-center text-gray-100 ">
            {release_date ? (
              <>
                <FaRegCalendarTimes className="mr-2"></FaRegCalendarTimes>
                {formatDate(release_date)}
              </>
            ) : (
              []
            )}
          </div>
          <div className="flex space-x-2">
            {Array.isArray(tags) &&
              tags.map((tag, index) => {
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
    </div>
  );
};
