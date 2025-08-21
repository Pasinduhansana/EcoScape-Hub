import React from "react";
import Navbar from "./layout/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./layout/Footer";
import { useAuth } from "../context/AuthContext";

const Layout = ({ children }) => {
  const location = useLocation();
  const { user, isAuthenticated } = useAuth();

  const authRoutes = ["/login", "/register", "/forgot-password"];
  const isAuthPage = authRoutes.includes(location.pathname);
  const isAdmin = isAuthenticated && user?.role === "admin";

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && !isAdmin && <Footer />}
    </div>
  );
};

export default Layout;
