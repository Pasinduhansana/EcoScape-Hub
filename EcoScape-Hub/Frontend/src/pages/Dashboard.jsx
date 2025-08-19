import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCalendarAlt,
  FaLeaf,
  FaChartLine,
  FaEdit,
  FaPlus,
  FaEye,
  FaClock,
  FaCheckCircle,
  FaBell,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeBookings: 0,
    completedProjects: 0,
    carbonOffset: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data
  const mockStats = {
    totalProjects: 8,
    activeBookings: 3,
    completedProjects: 5,
    carbonOffset: 2.4,
  };

  const mockBookings = [
    {
      id: "1",
      service: "Native Plant Landscaping",
      date: "2024-01-15",
      status: "scheduled",
      technician: "Sarah Johnson",
      price: 800,
    },
    {
      id: "2",
      service: "Organic Lawn Care",
      date: "2024-01-20",
      status: "in-progress",
      technician: "Mike Chen",
      price: 150,
    },
    {
      id: "3",
      service: "Garden Consultation",
      date: "2024-01-10",
      status: "completed",
      technician: "Emily Davis",
      price: 100,
    },
  ];

  const mockNotifications = [
    {
      id: "1",
      title: "Booking Confirmed",
      message:
        "Your Native Plant Landscaping service has been confirmed for January 15th.",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: "2",
      title: "Weather Alert",
      message:
        "Rain expected this week. Your outdoor service may be rescheduled.",
      time: "1 day ago",
      type: "warning",
    },
    {
      id: "3",
      title: "New Eco-Tip",
      message: "Learn about companion planting in our latest blog post.",
      time: "3 days ago",
      type: "info",
    },
  ];

  useEffect(() => {
    // Simulate API calls
    setTimeout(() => {
      setStats(mockStats);
      setRecentBookings(mockBookings);
      setNotifications(mockNotifications);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheckCircle className="w-4 h-4 text-green-600" />;
      case "warning":
        return <FaClock className="w-4 h-4 text-yellow-600" />;
      case "info":
        return <FaBell className="w-4 h-4 text-blue-600" />;
      default:
        return <FaBell className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between"
          >
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name || "User"}!
              </h1>
              <p className="text-lg text-gray-600">
                Here's what's happening with your sustainable landscape projects
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center gap-2">
                <FaPlus className="w-4 h-4" />
                Book New Service
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Cards */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Total Projects",
                value: stats.totalProjects,
                icon: FaLeaf,
                color: "bg-green-500",
                change: "+2 this month",
              },
              {
                title: "Active Bookings",
                value: stats.activeBookings,
                icon: FaCalendarAlt,
                color: "bg-blue-500",
                change: "3 upcoming",
              },
              {
                title: "Completed Projects",
                value: stats.completedProjects,
                icon: FaCheckCircle,
                color: "bg-purple-500",
                change: "100% satisfaction",
              },
              {
                title: "Carbon Offset",
                value: `${stats.carbonOffset} tons`,
                icon: FaChartLine,
                color: "bg-emerald-500",
                change: "CO₂ saved",
              },
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 font-medium mb-2">{stat.title}</p>
                  <p className="text-sm text-green-600">{stat.change}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Recent Bookings
                </h2>
                <button className="text-green-600 hover:text-green-500 font-medium">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {booking.service}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt className="w-3 h-3" />
                        {new Date(booking.date).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaUser className="w-3 h-3" />
                        {booking.technician}
                      </div>
                      <div className="font-semibold text-green-600">
                        ${booking.price}
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs hover:bg-gray-200 transition-colors duration-300">
                        <FaEye className="w-3 h-3" />
                        View
                      </button>
                      {booking.status === "scheduled" && (
                        <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs hover:bg-blue-200 transition-colors duration-300">
                          <FaEdit className="w-3 h-3" />
                          Reschedule
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  Notifications
                </h2>
                <button className="text-green-600 hover:text-green-500 font-medium">
                  Mark All Read
                </button>
              </div>

              <div className="space-y-4">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-l-4 border-green-500 pl-4 py-2"
                  >
                    <div className="flex items-start gap-2">
                      {getNotificationIcon(notification.type)}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-sm">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-2">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready for Your Next Eco-Project?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Explore our services and continue your journey toward sustainable
              landscaping
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                Browse Services
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300">
                View Portfolio
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
