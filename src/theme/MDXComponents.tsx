import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import ZoomableImage from "../components/ZoomableImage";

type AnchorProps = React.ComponentProps<"a">;

const OriginalAnchor = MDXComponents.a as React.ComponentType<AnchorProps>;

const isExternalHref = (href: AnchorProps["href"]) =>
  typeof href === "string" && /^https?:\/\//.test(href);

const withSafeExternalRel = (rel: AnchorProps["rel"]) => {
  const tokens = new Set((rel ?? "").split(/\s+/).filter(Boolean));
  tokens.add("noopener");
  tokens.add("noreferrer");
  return Array.from(tokens).join(" ");
};

// Override the default <img> element so every Markdown image
// is rendered as a clickable, zoomable figure with caption.
export default {
  ...MDXComponents,
  a: ({ href, rel, target, ...props }: AnchorProps) => {
    const external = isExternalHref(href);

    return (
      <OriginalAnchor
        {...props}
        href={href}
        rel={external ? withSafeExternalRel(rel) : rel}
        target={external ? target ?? "_blank" : target}
      />
    );
  },
  img: (props: React.ComponentProps<"img">) => <ZoomableImage {...props} />,
};
