import React from "react";
import type { HeadingProps } from "../../types/components";

export default function Heading({ level = 2, children, className = "" }: HeadingProps) {
  const Component = React.createElement(`h${level}`, {
    className: `font-bold ${className}`
  }, children);
  
  return Component;
}
