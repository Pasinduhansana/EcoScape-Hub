import React from "react";
import { Link } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";
import {
  FaLeaf,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Landscape Design", href: "/services/landscape-design" },
    { name: "Garden Installation", href: "/services/garden-installation" },
    { name: "Maintenance Services", href: "/services/maintenance" },
    { name: "Native Plant Restoration", href: "/services/native-restoration" },
    { name: "Water Conservation", href: "/services/water-conservation" },
  ];

  const resources = [
    { name: "Plant Care Guide", href: "/blog/plant-care" },
    { name: "Seasonal Tips", href: "/blog/seasonal-tips" },
    { name: "Sustainability Practices", href: "/blog/sustainability" },
    { name: "Design Inspiration", href: "/blog/design" },
    { name: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, href: "#", name: "Facebook" },
    { icon: FaTwitter, href: "#", name: "Twitter" },
    { icon: FaInstagram, href: "#", name: "Instagram" },
    { icon: FaLinkedinIn, href: "#", name: "LinkedIn" },
    { icon: FaYoutube, href: "#", name: "YouTube" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full mb-8 border border-white/20">
              <FaLeaf className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Stay Connected with
              <span className="block text-green-200">Nature</span>
            </h3>
            <p className="text-green-100 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
              Get the latest tips on sustainable landscaping, seasonal garden
              care, and eco-friendly practices delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-gray-900 bg-white/95 backdrop-blur-sm focus:outline-none focus:ring-4 focus:ring-green-400/50 focus:bg-white transition-all duration-300 placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="bg-green-800 hover:bg-green-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-400/50 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl"
                >
                  Subscribe
                  <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 mb-8 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FaLeaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                EcoScape Hub
              </span>
            </Link>
            <p className="text-gray-300 mb-8 max-w-md text-lg leading-relaxed">
              Creating sustainable, beautiful landscapes that benefit both
              people and the planet. Your trusted partner for eco-friendly
              landscaping solutions.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                  <MapPinIcon className="h-5 w-5 text-green-400 group-hover:text-white" />
                </div>
                <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                  123 Green Street, Eco City, EC 12345
                </span>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                  <PhoneIcon className="h-5 w-5 text-green-400 group-hover:text-white" />
                </div>
                <a
                  href="tel:+15551234567"
                  className="text-gray-300 group-hover:text-white transition-colors duration-300"
                >
                  (555) 123-4567
                </a>
              </div>
              <div className="flex items-center space-x-4 group">
                <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors duration-300">
                  <EnvelopeIcon className="h-5 w-5 text-green-400 group-hover:text-white" />
                </div>
                <a
                  href="mailto:info@ecoscapehub.com"
                  className="text-gray-300 group-hover:text-white transition-colors duration-300"
                >
                  info@ecoscapehub.com
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-green-600"></div>
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center group"
                  >
                    <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Services
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-green-600"></div>
            </h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <Link
                    to={service.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center group text-sm"
                  >
                    <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-bold text-white mb-6 relative">
              Resources
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-gradient-to-r from-green-400 to-green-600"></div>
            </h4>
            <ul className="space-y-3">
              {resources.map((resource, index) => (
                <li key={index}>
                  <Link
                    to={resource.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300 flex items-center group text-sm"
                  >
                    <ArrowRightIcon className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                    {resource.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-medium">Follow us:</span>
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-600 transition-all duration-300 group hover:scale-110"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                  </a>
                );
              })}
            </div>

            {/* Copyright */}
            <div className="text-center lg:text-right">
              <p className="text-gray-400 text-sm">
                © {currentYear} EcoScape Hub. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1 flex items-center justify-center lg:justify-end gap-1">
                Made with{" "}
                <FaHeart className="w-3 h-3 text-red-500 animate-pulse" /> for
                the planet
              </p>
            </div>
          </div>
        </div>

        {/* Legal Links */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              to="/privacy"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
            >
              Cookie Policy
            </Link>
            <Link
              to="/accessibility"
              className="text-gray-400 hover:text-green-400 transition-colors duration-300"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
