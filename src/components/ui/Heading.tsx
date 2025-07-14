import React from "react";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

export default function Heading({ level = 2, children, className = "" }: HeadingProps) {
  const Component = React.createElement(`h${level}`, {
    className: `font-bold ${className}`
  }, children);
  
  return Component;
}
