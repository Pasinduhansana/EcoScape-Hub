import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaDollarSign,
  FaLeaf,
  FaCheck,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const ServiceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState("basic");

  // Mock service data
  const mockService = {
    id: id,
    title: "Sustainable Garden Design",
    description:
      "Transform your outdoor space with our comprehensive sustainable garden design service. We create beautiful, eco-friendly landscapes that work in harmony with nature while reducing environmental impact.",
    longDescription:
      "Our sustainable garden design service combines aesthetic beauty with environmental responsibility. We specialize in creating outdoor spaces that not only look stunning but also support local ecosystems, conserve water, and reduce maintenance needs. Our team of certified landscape designers works closely with you to understand your vision and create a custom design that reflects your values and lifestyle.",
    category: "garden-design",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      "https://images.unsplash.com/photo-1574263867128-c8b69c0b6b66?w=800",
    ],
    rating: 4.8,
    reviews: 24,
    packages: {
      basic: {
        name: "Basic Design",
        price: 500,
        duration: "2-3 weeks",
        features: [
          "Site analysis and assessment",
          "Basic design concept",
          "Plant selection list",
          "2D layout drawing",
          "Installation guidelines",
          "One revision round",
        ],
      },
      standard: {
        name: "Standard Design",
        price: 800,
        duration: "3-4 weeks",
        features: [
          "Comprehensive site analysis",
          "Detailed design concept",
          "Native plant selection",
          "3D visualization",
          "Material specifications",
          "Planting schedule",
          "Two revision rounds",
          "Installation supervision",
        ],
      },
      premium: {
        name: "Premium Design",
        price: 1200,
        duration: "4-6 weeks",
        features: [
          "Complete site assessment",
          "Custom design solution",
          "Extensive plant palette",
          "3D renderings & walkthrough",
          "Sustainable material selection",
          "Irrigation design",
          "Maintenance plan",
          "Three revision rounds",
          "Project management",
          "6-month support",
        ],
      },
    },
    benefits: [
      "Reduced water consumption by up to 50%",
      "Lower maintenance requirements",
      "Support for local wildlife and pollinators",
      "Improved air and soil quality",
      "Increased property value",
      "Year-round visual interest",
    ],
    process: [
      {
        step: 1,
        title: "Initial Consultation",
        description: "We discuss your vision, budget, and site requirements.",
      },
      {
        step: 2,
        title: "Site Analysis",
        description:
          "Comprehensive assessment of soil, drainage, sun patterns, and existing conditions.",
      },
      {
        step: 3,
        title: "Design Development",
        description:
          "Creation of custom design concepts based on your needs and site conditions.",
      },
      {
        step: 4,
        title: "Plan Presentation",
        description:
          "Detailed presentation of the design with 3D visualizations and material specifications.",
      },
      {
        step: 5,
        title: "Implementation",
        description:
          "Professional installation or guidance for DIY implementation.",
      },
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        location: "Portland, OR",
        rating: 5,
        comment:
          "EcoScape Hub transformed our backyard into a beautiful, sustainable oasis. The native plants are thriving and we've seen so much more wildlife!",
      },
      {
        name: "Mike Chen",
        location: "Seattle, WA",
        rating: 5,
        comment:
          "Professional service from start to finish. Our water bill has decreased significantly since the installation.",
      },
    ],
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setService(mockService);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleBookNow = () => {
    // Navigate to booking page with service and package info
    navigate(`/book-service/${id}?package=${selectedPackage}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
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
            className="text-green-600 hover:text-green-500"
          >
            ← Back to Services
          </button>
        </div>
      </div>
    );
  }

  const currentPackage = service.packages[selectedPackage];

  return (
    <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <button
                onClick={() => navigate("/services")}
                className="flex items-center gap-2 text-green-600 hover:text-green-500 mb-6 font-medium"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Services
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Images */}
                <div>
                  <div className="aspect-w-16 aspect-h-12 mb-4">
                    <img
                      src={service.images[0]}
                      alt={service.title}
                      className="w-full h-96 object-cover rounded-2xl"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {service.images.slice(1, 4).map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${service.title} ${index + 2}`}
                        className="w-full h-24 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </div>

                {/* Service Info */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar className="w-4 h-4" />
                      <span className="font-medium text-gray-700">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-gray-500">
                      ({service.reviews} reviews)
                    </span>
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    {service.description}
                  </p>

                  {/* Package Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Choose Your Package
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {Object.entries(service.packages).map(([key, pkg]) => (
                        <div
                          key={key}
                          onClick={() => setSelectedPackage(key)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                            selectedPackage === key
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                {pkg.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {pkg.duration}
                              </p>
                            </div>
                            <div className="text-right">
                              <span className="text-2xl font-bold text-green-600">
                                ${pkg.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Current Package Details */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      {currentPackage.name} Includes:
                    </h4>
                    <ul className="space-y-2">
                      {currentPackage.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <FaCheck className="w-4 h-4 text-green-500" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2"
                  >
                    <FaCalendarAlt className="w-5 h-5" />
                    Book {currentPackage.name} - ${currentPackage.price}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Detailed Description */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                About This Service
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {service.longDescription}
              </p>

              {/* Benefits */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Key Benefits
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <FaLeaf className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Our Process
                </h3>
                <div className="space-y-6">
                  {service.process.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {step.title}
                        </h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                What Our Clients Say
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {service.testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-center gap-1 mb-4 text-yellow-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="w-4 h-4" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4">
                      "{testimonial.comment}"
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-4">Have Questions?</h2>
              <p className="text-xl mb-8 opacity-90">
                Get in touch with our team to discuss your specific needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="tel:+15551234567"
                  className="flex items-center justify-center gap-2 bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
                >
                  <FaPhone className="w-4 h-4" />
                  Call Us
                </a>
                <a
                  href="mailto:info@ecoscapehub.com"
                  className="flex items-center justify-center gap-2 border-2 border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300"
                >
                  <FaEnvelope className="w-4 h-4" />
                  Email Us
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
  );
};

export default ServiceDetail;
