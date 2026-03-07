import type { MDXComponents } from "mdx/types";
import { CodeBlockServer } from "./CodeBlockServer";

export const mdxComponents: MDXComponents = {
  pre: ({ children, ...props }: React.ComponentProps<"pre">) => {
    const child = children as React.ReactElement<{
      children: string;
      className?: string;
    }>;
    if (child?.props?.children) {
      return (
        <CodeBlockServer className={child.props.className}>
          {child.props.children}
        </CodeBlockServer>
      );
    }
    return <pre {...props}>{children}</pre>;
  },
};
