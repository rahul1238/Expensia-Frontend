import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavbarLink from "./ui/NavbarLink";
import LinkButton from "./ui/LinkButton";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent overflow-x-hidden pt-4">
      <div className="container mx-auto px-4 flex items-center justify-between h-16 bg-slate-200 rounded-md shadow-lg w-auto transition-all duration-300">
        <Link to="/" className="flex items-center space-x-2">
          <Logo size={36} />
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <NavbarLink href="#home">Home</NavbarLink>
          <NavbarLink href="#features">Features</NavbarLink>
          <NavbarLink href="#about">About</NavbarLink>
          <NavbarLink href="#team">Team</NavbarLink>
          <NavbarLink href="#contact">Contact</NavbarLink>
          <LinkButton to="/login" variant="ghost">Login</LinkButton>
          <LinkButton to="/signup" variant="primary">Sign Up</LinkButton>
        </div>
      </div>
    </nav>
  );
}
