import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaLeaf,
  FaPaperPlane,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { API_BASE_URL } from "../utils/constants";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    serviceType: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const serviceTypes = [
    { value: "general", label: "General Inquiry" },
    { value: "landscaping", label: "Landscaping Services" },
    { value: "maintenance", label: "Garden Maintenance" },
    { value: "consultation", label: "Consultation" },
    { value: "emergency", label: "Emergency Service" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        serviceType: "general",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: FaPhone,
      title: "Phone",
      details: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
      description: "Call us during business hours",
    },
    {
      icon: FaEnvelope,
      title: "Email",
      details: ["info@ecoscapehub.com", "support@ecoscapehub.com"],
      description: "Send us an email anytime",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Office",
      details: ["123 Green Valley Road", "Portland, OR 97205"],
      description: "Visit our sustainable office",
    },
    {
      icon: FaClock,
      title: "Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 9:00 AM - 4:00 PM"],
      description: "Emergency services available 24/7",
    },
  ];

  const socialLinks = [
    { icon: FaFacebook, url: "#", color: "text-blue-600" },
    { icon: FaTwitter, url: "#", color: "text-blue-400" },
    { icon: FaInstagram, url: "#", color: "text-pink-600" },
    { icon: FaLinkedin, url: "#", color: "text-blue-700" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Get In <span className="text-green-600">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Ready to transform your outdoor space? We'd love to hear about
              your project and discuss how we can bring your sustainable
              landscaping vision to life.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-700 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-gray-500 text-sm">{info.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Main Contact Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <FaLeaf className="w-6 h-6 text-green-600" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Send us a Message
                </h2>
              </div>

              {submitStatus === "success" && (
                <div className="bg-green-100 border border-green-200 text-green-700 px-4 py-3 rounded-xl mb-6">
                  Thank you for your message! We'll get back to you within 24
                  hours.
                </div>
              )}

              {submitStatus === "error" && (
                <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6">
                  Sorry, there was an error sending your message. Please try
                  again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="serviceType"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Service Type
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                    >
                      {serviceTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300"
                    placeholder="What can we help you with?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors duration-300 resize-none"
                    placeholder="Tell us about your project or inquiry..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Map and Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Visit Our Office
                </h3>
                <div className="h-64 bg-gray-200 rounded-xl flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FaMapMarkerAlt className="w-12 h-12 mx-auto mb-2" />
                    <p>Interactive Map</p>
                    <p className="text-sm">
                      123 Green Valley Road, Portland, OR 97205
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-green-50 rounded-xl">
                  <p className="text-sm text-green-800">
                    <strong>Eco-Friendly Office:</strong> Our office is powered
                    by renewable energy and features a living wall, rainwater
                    collection system, and native plant garden.
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Follow Us
                </h3>
                <p className="text-gray-600 mb-6">
                  Stay updated with our latest projects, eco-tips, and
                  sustainability news.
                </p>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        className={`w-12 h-12 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-green-500 transition-colors duration-300 ${social.color} hover:text-green-600`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Quick Questions?
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Response Time
                    </h4>
                    <p className="text-sm text-gray-600">
                      We typically respond to inquiries within 24 hours.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Free Consultations
                    </h4>
                    <p className="text-sm text-gray-600">
                      We offer free initial consultations for all new projects.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Emergency Services
                    </h4>
                    <p className="text-sm text-gray-600">
                      24/7 emergency services available for urgent landscape
                      issues.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Schedule a free consultation and let's discuss how we can create
              your perfect sustainable landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                Schedule Consultation
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300">
                Call Now
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
