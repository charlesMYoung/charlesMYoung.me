import type { MDXComponents } from "mdx/types";

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-default-500 font-bold">{children}</h1>
    ),
    p: ({ children }) => <p className="text-default-500">{children}</p>,
    code: ({ children }) => (
      <code className="text-primary-500">{children}</code>
    ),
    ...components,
  };
}
