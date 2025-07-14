import { Link } from "react-router-dom";
import Logo from "./Logo";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-auto rounded-md items-center ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex justify-between h-16 items-center ">
          <Logo/>
          <div className="hidden md:flex space-x-8">
            <a
              href="#home"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Home
            </a>
            <a
              href="#features"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Features
            </a>
            <a
              href="#about"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              About
            </a>
            <a
              href="#team"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Team
            </a>
            <a
              href="#contact"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Contact
            </a>
          </div>

          {/* Right Buttons */}
          <div className="hidden md:flex space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-green-600 font-medium transition"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
