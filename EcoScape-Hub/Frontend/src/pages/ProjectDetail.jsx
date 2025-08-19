import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLeaf,
  FaRuler,
  FaUser,
  FaCamera,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Mock project data
  const mockProject = {
    id: id,
    title: "Eco-Friendly Family Garden",
    description:
      "Complete backyard transformation featuring native plants, rain garden, and sustainable materials",
    longDescription:
      "This comprehensive project transformed a traditional suburban backyard into a thriving ecosystem that supports local wildlife while providing a beautiful outdoor space for the family. The design incorporates sustainable drainage solutions, native plant communities, and organic gardening practices.",
    category: "residential",
    location: "Portland, OR",
    completedDate: "2023-09-15",
    projectDuration: "3 weeks",
    size: "2,400 sq ft",
    client: "Johnson Family",
    budget: "$15,000 - $20,000",
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200",
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200",
      "https://images.unsplash.com/photo-1574263867128-c8b69c0b6b66?w=1200",
      "https://images.unsplash.com/photo-1534452116475-9b6b7a0b03f1?w=1200",
      "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=1200",
    ],
    beforeAfter: {
      before: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      after:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600",
    },
    features: [
      "Native plant garden with 25+ species",
      "Rain water collection system",
      "Pollinator habitat zones",
      "Organic vegetable beds",
      "Permeable patio materials",
      "Composting area",
      "Native tree canopy",
      "Wildlife water features",
    ],
    challenges: [
      "Steep slope requiring terracing solutions",
      "Poor drainage and standing water issues",
      "Compacted clay soil conditions",
      "Limited sun exposure in certain areas",
      "Existing invasive plant species",
    ],
    solutions: [
      "Implemented terraced rain gardens with native plantings",
      "Installed French drain system for water management",
      "Soil amendment with organic compost and mycorrhizae",
      "Strategic shade plant selection for low-light areas",
      "Systematic invasive species removal and soil restoration",
    ],
    results: [
      "60% reduction in irrigation water usage",
      "Documented 15+ bird species using the garden",
      "40+ butterfly and bee species observed",
      "Zero chemical fertilizers or pesticides used",
      "Eliminated standing water and drainage issues",
      "Created 4-season visual interest",
    ],
    materials: [
      {
        category: "Plants",
        items: [
          "Native Oregon grape",
          "Pacific ninebark",
          "Red flowering currant",
          "Western sword fern",
        ],
      },
      {
        category: "Hardscape",
        items: [
          "Reclaimed brick pathways",
          "Natural stone retaining walls",
          "Recycled concrete aggregate",
        ],
      },
      {
        category: "Infrastructure",
        items: [
          "Drip irrigation system",
          "Rain barrels",
          "Permeable pavers",
          "French drains",
        ],
      },
    ],
    timeline: [
      {
        phase: "Planning & Design",
        duration: "2 weeks",
        description:
          "Site analysis, design development, and permit acquisition",
      },
      {
        phase: "Site Preparation",
        duration: "1 week",
        description: "Excavation, drainage installation, and soil preparation",
      },
      {
        phase: "Hardscape Installation",
        duration: "1 week",
        description: "Pathways, retaining walls, and infrastructure",
      },
      {
        phase: "Planting & Finishing",
        duration: "1 week",
        description: "Plant installation, mulching, and final details",
      },
    ],
    tags: [
      "Sustainable",
      "Native Plants",
      "Water Management",
      "Wildlife Habitat",
      "Residential",
    ],
    clientTestimonial: {
      quote:
        "EcoScape Hub transformed our backyard into a beautiful, sustainable oasis. Our kids love watching the butterflies and birds, and we've learned so much about native plants. The rain garden has completely solved our drainage problems, and our water bill has decreased significantly.",
      client: "Sarah Johnson",
      title: "Homeowner",
    },
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProject(mockProject);
      setLoading(false);
    }, 1000);
  }, [id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Project Not Found
            </h2>
            <button
              onClick={() => navigate("/projects")}
              className="text-green-600 hover:text-green-500"
            >
              ← Back to Projects
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
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
                onClick={() => navigate("/projects")}
                className="flex items-center gap-2 text-green-600 hover:text-green-500 mb-6 font-medium"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Projects
              </button>

              {/* Image Gallery */}
              <div className="relative mb-8">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <img
                    src={project.images[currentImageIndex]}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                </div>

                {/* Image Navigation */}
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors duration-300"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors duration-300"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  <FaCamera className="w-3 h-3 inline mr-1" />
                  {currentImageIndex + 1} / {project.images.length}
                </div>

                {/* Thumbnail Navigation */}
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {project.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-300 ${
                        index === currentImageIndex
                          ? "border-green-500"
                          : "border-gray-200"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Project Header */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {project.title}
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    {project.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Project Details */}
                <div className="bg-white rounded-2xl p-6 shadow-lg h-fit">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Project Details
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <FaMapMarkerAlt className="w-4 h-4 text-green-600" />
                      <div>
                        <span className="text-sm text-gray-500">Location</span>
                        <p className="font-medium">{project.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="w-4 h-4 text-green-600" />
                      <div>
                        <span className="text-sm text-gray-500">Completed</span>
                        <p className="font-medium">
                          {new Date(project.completedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaRuler className="w-4 h-4 text-green-600" />
                      <div>
                        <span className="text-sm text-gray-500">Size</span>
                        <p className="font-medium">{project.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FaUser className="w-4 h-4 text-green-600" />
                      <div>
                        <span className="text-sm text-gray-500">Client</span>
                        <p className="font-medium">{project.client}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Before & After */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Before & After
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Before
                  </h3>
                  <img
                    src={project.beforeAfter.before}
                    alt="Before transformation"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    After
                  </h3>
                  <img
                    src={project.beforeAfter.after}
                    alt="After transformation"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features, Challenges & Solutions */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FaLeaf className="w-4 h-4 text-green-500 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Challenges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Challenges
                </h3>
                <ul className="space-y-3">
                  {project.challenges.map((challenge, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium text-red-600">•</span>{" "}
                      {challenge}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Solutions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Solutions
                </h3>
                <ul className="space-y-3">
                  {project.solutions.map((solution, index) => (
                    <li key={index} className="text-gray-700">
                      <span className="font-medium text-green-600">✓</span>{" "}
                      {solution}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Project Results
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.results.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-green-50 rounded-xl"
                  >
                    <FaLeaf className="w-5 h-5 text-green-600" />
                    <span className="text-gray-800">{result}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Project Timeline
              </h2>
              <div className="space-y-6">
                {project.timeline.map((phase, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="bg-white rounded-xl p-6 shadow-lg flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">
                          {phase.phase}
                        </h4>
                        <span className="text-sm text-green-600 font-medium">
                          {phase.duration}
                        </span>
                      </div>
                      <p className="text-gray-600">{phase.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Client Testimonial */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-green-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold mb-8">Client Testimonial</h2>
              <blockquote className="text-xl italic mb-6 leading-relaxed">
                "{project.clientTestimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold text-lg">
                  {project.clientTestimonial.client}
                </p>
                <p className="opacity-90">{project.clientTestimonial.title}</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready for Your Own Transformation?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Let's create a sustainable landscape that's perfect for your
                space and lifestyle
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/services")}
                  className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors duration-300"
                >
                  View Our Services
                </button>
                <button
                  onClick={() => navigate("/contact")}
                  className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-colors duration-300"
                >
                  Get Free Consultation
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ProjectDetail;
