import React from "react";

export const Footer = () => {
  return (
    <footer className="container mx-auto max-w-7xl pb-12 px-12">
      <div className="flex flex-col justify-center items-center gap-1">
        <p className="text-sm text-default-400">&copy; &nbsp; Arnold Yang</p>
        <a
          className="relative tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium no-underline hover:opacity-80 active:opacity-disabled transition-opacity flex justify-end items-center gap-2 text-foreground"
          role="link"
          href="https://www.vercel.com?utm_source=nextui&amp;utm_marketing=oss"
          rel="noopener noreferrer"
          target="_blank"
        >
          <p className="font-normal">Deployed on</p>
        </a>
      </div>
    </footer>
  );
};
