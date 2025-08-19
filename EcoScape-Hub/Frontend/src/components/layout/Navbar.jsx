import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { FaLeaf } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <FaLeaf className="h-8 w-8" />
              <span className="text-xl font-bold">EcoScape Hub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                  isActiveLink(item.href)
                    ? "text-green-600 active"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-colors"
                >
                  <UserIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    {user?.name || "Dashboard"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-sm">
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600 transition-colors"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  isActiveLink(item.href)
                    ? "text-green-600 bg-green-50"
                    : "text-gray-700 hover:text-green-600 hover:bg-green-50"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-200 pt-4 pb-3">
              {isAuthenticated ? (
                <div className="space-y-1">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                  >
                    <UserIcon className="h-5 w-5" />
                    <span>{user?.name || "Dashboard"}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 text-base font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                  >
                    <ArrowRightOnRectangleIcon className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-1">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-base font-medium bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors mx-3"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
