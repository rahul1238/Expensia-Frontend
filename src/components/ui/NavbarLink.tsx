import type { NavbarLinkProps } from "../../types/components";

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
