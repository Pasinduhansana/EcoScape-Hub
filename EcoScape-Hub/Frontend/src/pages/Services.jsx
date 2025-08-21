import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaLeaf,
  FaTree,
  FaSeedling,
  FaWater,
  FaRecycle,
  FaHeart,
  FaArrowRight,
  FaCheck,
  FaStar,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { API_BASE_URL } from "../utils/constants";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Services", icon: FaLeaf },
    { id: "landscaping", name: "Landscaping", icon: FaTree },
    { id: "garden-design", name: "Garden Design", icon: FaSeedling },
    { id: "irrigation", name: "Irrigation", icon: FaWater },
    { id: "maintenance", name: "Maintenance", icon: FaRecycle },
    { id: "consultation", name: "Consultation", icon: FaHeart },
  ];

  const mockServices = [
    {
      _id: "1",
      title: "Sustainable Garden Design",
      description:
        "Custom garden designs using native plants and eco-friendly materials",
      category: "garden-design",
      price: 500,
      duration: "2-3 weeks",
      image:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",
      features: [
        "Native plant selection",
        "Water-efficient design",
        "Soil analysis",
        "3D visualization",
      ],
      rating: 4.8,
      reviews: 24,
    },
    {
      _id: "2",
      title: "Organic Lawn Care",
      description:
        "Chemical-free lawn maintenance using organic fertilizers and natural pest control",
      category: "maintenance",
      price: 150,
      duration: "Monthly",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",
      features: [
        "Organic fertilizers",
        "Natural pest control",
        "Soil health improvement",
        "Seasonal care",
      ],
      rating: 4.9,
      reviews: 18,
    },
    {
      _id: "3",
      title: "Native Plant Landscaping",
      description:
        "Transform your outdoor space with indigenous plants that thrive naturally",
      category: "landscaping",
      price: 800,
      duration: "1-2 weeks",
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=500",
      features: [
        "Native species selection",
        "Habitat creation",
        "Low maintenance design",
        "Wildlife friendly",
      ],
      rating: 4.7,
      reviews: 31,
    },
    {
      _id: "4",
      title: "Smart Irrigation Systems",
      description:
        "Water-efficient irrigation solutions with smart controls and sensors",
      category: "irrigation",
      price: 1200,
      duration: "3-5 days",
      image:
        "https://images.unsplash.com/photo-1574263867128-c8b69c0b6b66?w=500",
      features: [
        "Smart controllers",
        "Soil moisture sensors",
        "Weather integration",
        "Water usage tracking",
      ],
      rating: 4.6,
      reviews: 15,
    },
    {
      _id: "5",
      title: "Eco-Friendly Consultation",
      description:
        "Expert advice on sustainable landscaping practices and environmental solutions",
      category: "consultation",
      price: 100,
      duration: "2 hours",
      image:
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=500",
      features: [
        "Site assessment",
        "Sustainability audit",
        "Custom recommendations",
        "Follow-up support",
      ],
      rating: 4.9,
      reviews: 42,
    },
    {
      _id: "6",
      title: "Rain Garden Installation",
      description:
        "Specialized gardens designed to manage stormwater runoff naturally",
      category: "landscaping",
      price: 600,
      duration: "1 week",
      image:
        "https://images.unsplash.com/photo-1534452116475-9b6b7a0b03f1?w=500",
      features: [
        "Drainage analysis",
        "Native plant selection",
        "Bioretention design",
        "Erosion control",
      ],
      rating: 4.8,
      reviews: 19,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setServices(mockServices);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredServices =
    selectedCategory === "all"
      ? services
      : services.filter((service) => service.category === selectedCategory);

  const handleBookService = (serviceId) => {
    // Navigate to booking page or open booking modal
    console.log("Booking service:", serviceId);
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
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Our <span className="text-green-600">Eco-Friendly</span> Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Transform your outdoor space with our sustainable landscaping
              solutions. From garden design to maintenance, we create beautiful
              environments that work in harmony with nature.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-green-50 border border-gray-200"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-green-600 font-semibold">
                      ${service.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <FaStar className="w-4 h-4" />
                      <span className="text-sm font-medium text-gray-700">
                        {service.rating}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({service.reviews} reviews)
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{service.description}</p>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span className="font-medium">Duration:</span>
                      <span>{service.duration}</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What's Included:
                    </h4>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-600"
                        >
                          <FaCheck className="w-3 h-3 text-green-500" />
                          {feature}
                        </li>
                      ))}
                      {service.features.length > 3 && (
                        <li className="text-sm text-gray-500">
                          +{service.features.length - 3} more features
                        </li>
                      )}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleBookService(service._id)}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 group"
                  >
                    Book Service
                    <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </motion.div>
            ))}
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
            className="bg-gradient-to-r from-green-600 to-green-800 rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Outdoor Space?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get a free consultation and discover how we can create a
              sustainable landscape that's perfect for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300">
                Get Free Quote
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

export default Services;
