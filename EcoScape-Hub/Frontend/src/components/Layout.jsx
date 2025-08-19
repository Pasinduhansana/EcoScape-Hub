import React from "react";
import Navbar from "./layout/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "./layout/Footer";

const Layout = ({ children }) => {
  const location = useLocation();

  const authRoutes = ["/login", "/register", "/forgot-password"];
  const isAuthPage = authRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isAuthPage && <Footer />}
    </div>
  );
};

export default Layout;
