import React, { ReactNode } from "react";

export const Main = ({ children }: { children: ReactNode }) => {
  return (
    <section className="bg-background pb-20 box-border flex-1 container mx-auto">
      {children}
    </section>
  );
};
