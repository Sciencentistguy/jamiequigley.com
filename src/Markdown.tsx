import type { ComponentProps, JSX } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import { Link } from "react-router";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

// Internal links go through the router; everything else is a normal anchor.
function Anchor({ href, node: _node, ...props }: ComponentProps<"a"> & { node?: unknown }) {
  if (href?.startsWith("/")) return <Link to={href} {...props} />;
  return <a href={href} {...props} />;
}

function heading(Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  return function Heading({
    id,
    children,
    node: _node,
    ...props
  }: JSX.IntrinsicElements[typeof Tag] & { node?: unknown }) {
    return (
      <Tag id={id} {...props}>
        {children}
        {id && (
          <a href={`#${id}`} className="hanchor" aria-label="Anchor">
            ⌗
          </a>
        )}
      </Tag>
    );
  };
}

const withAnchors: Components = {
  a: Anchor,
  h1: heading("h1"),
  h2: heading("h2"),
  h3: heading("h3"),
  h4: heading("h4"),
  h5: heading("h5"),
  h6: heading("h6"),
};

export default function Markdown({ children, anchors = false }: { children: string; anchors?: boolean }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSlug]}
      components={anchors ? withAnchors : { a: Anchor }}
    >
      {children}
    </ReactMarkdown>
  );
}
