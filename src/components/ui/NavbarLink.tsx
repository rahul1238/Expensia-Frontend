import React, { type AnchorHTMLAttributes } from "react";

interface NavbarLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

function NavbarLink({ href, children, ...props }: NavbarLinkProps) {
  return (
    <a
      href={href}
      className="text-black hover:text-green-400 font-medium transition"
      {...props}
    >
      {children}
    </a>
  );
}

export default NavbarLink;
