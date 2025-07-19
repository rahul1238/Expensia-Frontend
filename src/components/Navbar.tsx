import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../feature/auth/authSlice";
import Logo from "./Logo";
import NavbarLink from "./ui/NavbarLink";
import LinkButton from "./ui/LinkButton";
import ThemeToggle from "./ThemeToggle";
import type { RootState } from "../app/store";

export default function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const isHomePage = location.pathname === '/';

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 mt-4 flex items-center justify-between h-16 bg-white/15 dark:bg-slate-900/15 backdrop-blur-sm rounded-md shadow-sm pointer-events-auto">
        <Link to="/" className="flex items-center space-x-2">
          <Logo size={36} />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          {isHomePage ? (
            // Links for the home page
            <>
              <NavbarLink href="#home" className="text-blue-300 hover:text-green-400 dark:text-blue-400 dark:hover:text-green-300">Home</NavbarLink>
              <NavbarLink href="#features" className="text-blue-300 hover:text-green-400 dark:text-blue-400 dark:hover:text-green-300">Features</NavbarLink>
              <NavbarLink href="#about" className="text-blue-300 hover:text-green-400 dark:text-blue-400 dark:hover:text-green-300">About</NavbarLink>
              <NavbarLink href="#team" className="text-blue-300 hover:text-green-400 dark:text-blue-400 dark:hover:text-green-300">Team</NavbarLink>
              <NavbarLink href="#contact" className="text-blue-300 hover:text-green-400 dark:text-blue-400 dark:hover:text-green-300">Contact</NavbarLink>
            </>
          ) : (
            // Links for other pages based on auth status
            isAuthenticated && (
              <>
                <Link to="/dashboard" className="text-blue-300 hover:text-green-400 dark:text-blue-400 dark:hover:text-green-300">Dashboard</Link>
                <Link to="/transactions" className="text-blue-300 hover:text-green-400 dark:text-blue-400 dark:hover:text-green-300">Transactions</Link>
                <Link to="/budget" className="text-blue-300 hover:text-green-400 dark:text-blue-400 dark:hover:text-green-300">Budget</Link>
                <Link to="/reports" className="text-blue-300 hover:text-green-400 dark:text-blue-400 dark:hover:text-green-300">Reports</Link>
              </>
            )
          )}
          
          <ThemeToggle />
          
          {isAuthenticated ? (
            // User is logged in
            <>
              <span className="text-blue-300 dark:text-blue-400">Hello, {user?.name || 'User'}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            // User is not logged in
            <>
              <LinkButton to="/login" variant="ghost">Login</LinkButton>
              <LinkButton to="/signup" variant="primary">Sign Up</LinkButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
