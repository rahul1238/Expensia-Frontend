import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

import type { RootState } from "./app/store";

function App() {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const location = useLocation();
  
  useEffect(() => {
    // Make sure all existing classes are removed first
    document.documentElement.classList.remove('dark', 'light');
    // Then add the appropriate class
    document.documentElement.classList.add(themeMode);
    console.log("App theme mode set to:", themeMode);
  }, [themeMode]);

  // Determine if the current route is a public route (like login/signup)
  const isPublicRoute = ['/login', '/signup'].includes(location.pathname);

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
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isPublicRoute && <Footer />}
    </div>
  );
}

export default App;