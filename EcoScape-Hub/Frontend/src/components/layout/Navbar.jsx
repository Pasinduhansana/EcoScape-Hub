import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  CogIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { FaLeaf } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Regular navigation for non-admin users
  const navigation = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Admin navigation items
  const adminNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Customer Management", href: "/admin/customers", icon: UsersIcon },
    {
      name: "Maintenance",
      href: "/admin/maintenance",
      icon: WrenchScrewdriverIcon,
    },
    { name: "Settings", href: "/admin/settings", icon: CogIcon },
  ];

  const isActiveLink = (href) => {
    return location.pathname === href;
  };

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const isAdmin = user?.role === "admin";

  // Choose navigation based on user role
  const currentNavigation = isAdmin ? adminNavigation : navigation;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md bg-white/50 shadow-lg border-none border-white/20"
          : "bg-transparent"
      }`}
    >
      <div className="mx-20 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center space-x-2 group transition-all duration-300"
            >
              <div
                className={`p-2 rounded-xl transition-all duration-300 ${
                  scrolled
                    ? "bg-green-100/80 backdrop-blur-sm"
                    : "bg-white/20 backdrop-blur-sm"
                }`}
              >
                <FaLeaf
                  className={`h-6 w-6 transition-colors duration-300 ${
                    scrolled
                      ? "text-green-600"
                      : "text-green-600 group-hover:text-green-200"
                  }`}
                />
              </div>
              <span
                className={`text-xl font-bold transition-colors duration-300 ${
                  scrolled
                    ? "text-gray-900"
                    : "text-gray-700 group-hover:text-green-100"
                }`}
              >
                EcoScape Hub
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {currentNavigation.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActiveLink(item.href)
                      ? scrolled
                        ? "bg-green-100/80 text-green-700 backdrop-blur-sm"
                        : "bg-green-100/80 text-green-700 backdrop-blur-sm"
                      : scrolled
                      ? "text-gray-700 hover:bg-gray-100/80 hover:text-green-600 backdrop-blur-sm"
                      : " hover:bg-white/20 hover:text-gray-700 backdrop-blur-sm text-gray-700"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {IconComponent && <IconComponent className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </div>
                  {isActiveLink(item.href) && (
                    <div
                      className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full transition-colors duration-300 ${
                        scrolled ? "bg-green-600" : "bg-green-600"
                      }`}
                    ></div>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {/* User Profile */}
                <div
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    scrolled
                      ? "bg-gray-100/80 backdrop-blur-sm"
                      : "bg-gray-100/80 backdrop-blur-sm"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      scrolled
                        ? "bg-green-100 text-green-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    <UserIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <span
                      className={`text-sm font-medium transition-colors duration-300 ${
                        scrolled ? "text-gray-900" : "text-gray-700"
                      }`}
                    >
                      {user?.name || "User"}
                    </span>
                    {isAdmin && (
                      <div
                        className={`text-xs transition-colors duration-300 ${
                          scrolled ? "text-green-600" : "text-green-600"
                        }`}
                      >
                        Admin
                      </div>
                    )}
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? "text-red-600 hover:bg-red-50/80 backdrop-blur-sm"
                      : "text-red-600 hover:bg-red-50/80 backdrop-blur-sm"
                  }`}
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? "text-gray-700 hover:bg-gray-100/80 backdrop-blur-sm"
                      : "text-gray-700 hover:bg-white backdrop-blur-sm"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    scrolled
                      ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                      : "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-xl transition-all duration-300 ${
                scrolled
                  ? "text-gray-700 hover:bg-gray-100/80 backdrop-blur-sm"
                  : "text-white hover:bg-white/20 backdrop-blur-sm"
              }`}
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
        <div className="md:hidden absolute top-full left-0 right-0">
          <div className="mx-20 mt-2">
            <div className="backdrop-blur-md bg-white/90 rounded-2xl shadow-xl border-none border-transparent overflow-hidden">
              {/* Navigation Links */}
              <div className="px-4 py-4 space-y-1">
                {currentNavigation.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                        isActiveLink(item.href)
                          ? "bg-green-100 text-green-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {IconComponent && <IconComponent className="h-5 w-5" />}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Auth Section */}
              <div
                className="border-t
               border-gray-200/50 px-4 py-4"
              >
                {isAuthenticated ? (
                  <div className="space-y-2">
                    {/* User Info */}
                    <div className="flex items-center space-x-3 px-4 py-3 bg-gray-50/80 rounded-xl">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user?.name || "User"}
                        </div>
                        {isAdmin && (
                          <div className="text-xs text-green-600">Admin</div>
                        )}
                      </div>
                    </div>

                    {/* Logout Button */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full text-left"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsOpen(false)}
                      className="block px-4 py-3 text-base font-medium bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors text-center"
                    >
                      Get Started
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
