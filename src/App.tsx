import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { logIn } from "./feature/auth/authSlice";
import { userService } from "./services/userService";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

import type { RootState } from "./app/store";

function App() {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(themeMode);
  }, [themeMode]);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Skip auth check if we're already on auth pages to prevent loops
        if (['/login', '/signup', '/forgot-password'].includes(location.pathname)) {
          setLoading(false);
          return;
        }

        const user = await userService.getCurrentUser();

        dispatch(logIn({
          user,
          token: "auth-cookie-present"
        }));
      } catch (err) {
        // User is not authenticated - normal if not logged in
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, [dispatch]); // Only depend on dispatch, not location.pathname

  const isPublicRoute = ['/login', '/signup'].includes(location.pathname);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/transactions" element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isPublicRoute && <Footer />}
    </div>
  );
}

export default App;
