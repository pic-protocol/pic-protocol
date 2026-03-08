import React from "react";
import MDXComponents from "@theme-original/MDXComponents";
import ZoomableImage from "../components/ZoomableImage";

// Override the default <img> element so every Markdown image
// is rendered as a clickable, zoomable figure with caption.
export default {
  ...MDXComponents,
  img: (props: React.ComponentProps<"img">) => <ZoomableImage {...props} />,
};
