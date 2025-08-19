import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowLeft,
  FaCheck,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const BookService = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    preferredDate: "",
    preferredTime: "",
    address: "",
    phone: "",
    email: user?.email || "",
    specialRequests: "",
    propertySize: "",
    urgency: "normal",
  });

  // Mock service data
  const mockService = {
    _id: serviceId,
    title: "Native Plant Landscaping",
    description:
      "Transform your outdoor space with indigenous plants that thrive naturally",
    price: 800,
    duration: "1-2 weeks",
    category: "landscaping",
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500",
    features: [
      "Native species selection",
      "Habitat creation",
      "Low maintenance design",
      "Wildlife friendly",
    ],
    estimatedTime: "1-2 weeks",
    includes: [
      "Site assessment and soil analysis",
      "Custom landscape design",
      "Native plant selection and sourcing",
      "Professional installation",
      "Initial watering and care instructions",
      "30-day plant guarantee",
    ],
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setService(mockService);
      setLoading(false);
    }, 1000);
  }, [serviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Show success message and redirect
      alert(
        "Booking submitted successfully! We will contact you within 24 hours to confirm."
      );
      navigate("/dashboard");
    } catch (error) {
      alert("Error submitting booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Service Not Found
          </h2>
          <button
            onClick={() => navigate("/services")}
            className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300"
          >
            View All Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-green-600 hover:text-green-500 font-medium mb-8"
        >
          <FaArrowLeft className="w-4 h-4" />
          Back to Services
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Service Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <img
              src={service.image}
              alt={service.title}
              className="w-full h-64 object-cover rounded-xl mb-6"
            />

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {service.title}
            </h1>
            <p className="text-gray-600 mb-6">{service.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <FaDollarSign className="w-4 h-4 text-green-600" />
                <span className="font-semibold">${service.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="w-4 h-4 text-blue-600" />
                <span>{service.estimatedTime}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                What's Included:
              </h3>
              <ul className="space-y-2">
                {service.includes.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <FaCheck className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 p-4 rounded-xl">
              <p className="text-green-800 text-sm">
                <strong>Free Consultation:</strong> We offer a complimentary
                initial consultation to discuss your specific needs and provide
                a detailed quote.
              </p>
            </div>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl p-8 shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Book This Service
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Property Address */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Property Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Full property address"
                  />
                </div>
              </div>

              {/* Scheduling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="preferredDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Preferred Date *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      id="preferredDate"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Preferred Time
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="morning">Morning (8AM - 12PM)</option>
                    <option value="afternoon">Afternoon (12PM - 5PM)</option>
                    <option value="flexible">Flexible</option>
                  </select>
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="propertySize"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Property Size (approx.)
                  </label>
                  <select
                    id="propertySize"
                    name="propertySize"
                    value={formData.propertySize}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Select size</option>
                    <option value="small">Small (&lt; 1,000 sq ft)</option>
                    <option value="medium">Medium (1,000 - 5,000 sq ft)</option>
                    <option value="large">Large (5,000 - 10,000 sq ft)</option>
                    <option value="xlarge">
                      Extra Large (&gt; 10,000 sq ft)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="urgency"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Project Urgency
                  </label>
                  <select
                    id="urgency"
                    name="urgency"
                    value={formData.urgency}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent (within 1 week)</option>
                    <option value="flexible">Flexible timing</option>
                  </select>
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label
                  htmlFor="specialRequests"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Special Requests or Notes
                </label>
                <textarea
                  id="specialRequests"
                  name="specialRequests"
                  rows={4}
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Tell us about any specific requirements, preferences, or questions..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <LoadingSpinner size="small" color="white" />
                    Submitting Booking...
                  </>
                ) : (
                  <>
                    <FaCalendarAlt className="w-4 h-4" />
                    Submit Booking Request
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                We'll contact you within 24 hours to confirm your booking and
                discuss project details.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookService;
