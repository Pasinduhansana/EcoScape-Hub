import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaLeaf,
  FaEye,
  FaFilter,
  FaSearch,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";
import { API_BASE_URL } from "../utils/constants";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = [
    { id: "all", name: "All Projects" },
    { id: "residential", name: "Residential" },
    { id: "commercial", name: "Commercial" },
    { id: "public", name: "Public Spaces" },
    { id: "restoration", name: "Restoration" },
  ];

  const mockProjects = [
    {
      _id: "1",
      title: "Eco-Friendly Family Garden",
      description:
        "Complete backyard transformation featuring native plants, rain garden, and sustainable materials",
      category: "residential",
      location: "Portland, OR",
      completedDate: "2023-09-15",
      size: "2,400 sq ft",
      client: "Johnson Family",
      images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
      ],
      features: [
        "Native plant garden",
        "Rain water collection",
        "Pollinator habitat",
        "Organic vegetable beds",
      ],
      challenges:
        "Steep slope and poor drainage required innovative terracing solutions",
      solution:
        "Implemented terraced rain gardens with native plantings to manage water flow naturally",
      results:
        "60% reduction in water usage, increased biodiversity, and year-round beauty",
      tags: ["Sustainable", "Native Plants", "Water Management"],
    },
    {
      _id: "2",
      title: "Corporate Campus Green Roof",
      description:
        "Extensive green roof installation with native grasses and wildflowers for storm water management",
      category: "commercial",
      location: "Seattle, WA",
      completedDate: "2023-08-20",
      size: "12,000 sq ft",
      client: "TechCorp Industries",
      images: [
        "https://images.unsplash.com/photo-1574263867128-c8b69c0b6b66?w=800",
        "https://images.unsplash.com/photo-1534452116475-9b6b7a0b03f1?w=800",
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800",
      ],
      features: [
        "Extensive green roof",
        "Storm water management",
        "Employee outdoor space",
        "Solar integration",
      ],
      challenges: "Structural limitations and extreme weather conditions",
      solution:
        "Lightweight growing medium with drought-tolerant native species",
      results:
        "40% reduction in building energy costs and improved employee satisfaction",
      tags: ["Green Roof", "Commercial", "Energy Efficient"],
    },
    {
      _id: "3",
      title: "Community Park Restoration",
      description:
        "Native habitat restoration project transforming degraded parkland into thriving ecosystem",
      category: "public",
      location: "Eugene, OR",
      completedDate: "2023-07-10",
      size: "5 acres",
      client: "City of Eugene Parks Department",
      images: [
        "https://images.unsplash.com/photo-1574263867128-c8b69c0b6b66?w=800",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
        "https://images.unsplash.com/photo-1534452116475-9b6b7a0b03f1?w=800",
      ],
      features: [
        "Native forest restoration",
        "Invasive species removal",
        "Trail system",
        "Educational signage",
      ],
      challenges: "Extensive invasive species and soil contamination",
      solution:
        "Phased restoration approach with soil remediation and native plantings",
      results:
        "Restored 5 acres of native habitat and created educational opportunities",
      tags: ["Restoration", "Community", "Education"],
    },
    {
      _id: "4",
      title: "Waterfront Erosion Control",
      description:
        "Bioengineered shoreline stabilization using native vegetation and sustainable materials",
      category: "restoration",
      location: "Vancouver, WA",
      completedDate: "2023-06-05",
      size: "800 linear ft",
      client: "Columbia River Conservancy",
      images: [
        "https://images.unsplash.com/photo-1534452116475-9b6b7a0b03f1?w=800",
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800",
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
      ],
      features: [
        "Living shoreline",
        "Native riparian plants",
        "Fish habitat enhancement",
        "Erosion control",
      ],
      challenges: "Severe erosion and fluctuating water levels",
      solution:
        "Bioengineered approach using native vegetation and natural materials",
      results: "Stabilized 800ft of shoreline and enhanced fish habitat",
      tags: ["Bioengineering", "Habitat", "Water Management"],
    },
    {
      _id: "5",
      title: "Urban Pollinator Garden",
      description:
        "Rooftop garden designed specifically to support urban pollinators with year-round blooms",
      category: "commercial",
      location: "Portland, OR",
      completedDate: "2023-05-15",
      size: "1,800 sq ft",
      client: "Downtown Hotel Group",
      images: [
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
        "https://images.unsplash.com/photo-1574263867128-c8b69c0b6b66?w=800",
      ],
      features: [
        "Pollinator habitat",
        "Succession planting",
        "Native bee houses",
        "Educational displays",
      ],
      challenges: "Limited soil depth and urban pollution",
      solution:
        "Specialized growing medium and pollution-tolerant native species",
      results:
        "Documented 15 bee species and 20 butterfly species using the garden",
      tags: ["Pollinators", "Urban", "Biodiversity"],
    },
    {
      _id: "6",
      title: "Sustainable Vineyard Landscaping",
      description:
        "Drought-tolerant landscape design for winery featuring native plants and water conservation",
      category: "commercial",
      location: "Willamette Valley, OR",
      completedDate: "2023-04-20",
      size: "3 acres",
      client: "Valley View Winery",
      images: [
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800",
        "https://images.unsplash.com/photo-1534452116475-9b6b7a0b03f1?w=800",
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800",
      ],
      features: [
        "Drought-tolerant design",
        "Native groundcovers",
        "Integrated pest management",
        "Visitor areas",
      ],
      challenges: "Sandy soil and limited water availability",
      solution:
        "Mediterranean-style design with Pacific Northwest native plants",
      results:
        "70% reduction in irrigation needs and enhanced visitor experience",
      tags: ["Drought-Tolerant", "Agriculture", "Mediterranean"],
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProjects(mockProjects);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === "all" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
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
              Our <span className="text-green-600">Portfolio</span> of Success
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Explore our collection of sustainable landscaping projects that
              demonstrate our commitment to environmental stewardship and
              innovative design solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8"
          >
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-green-50 border border-gray-200"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <FaEye className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {project.category.charAt(0).toUpperCase() +
                      project.category.slice(1)}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaMapMarkerAlt className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaCalendarAlt className="w-4 h-4" />
                      <span>
                        {new Date(project.completedDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <FaLeaf className="w-4 h-4" />
                      <span>{project.size}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No projects found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {selectedProject.title}
                </h2>
                <button
                  onClick={closeProjectModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <div className="space-y-4 mb-6">
                    {selectedProject.images.map((image, idx) => (
                      <img
                        key={idx}
                        src={image}
                        alt={`${selectedProject.title} ${idx + 1}`}
                        className="w-full h-48 object-cover rounded-xl"
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Project Details
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">
                            {selectedProject.location}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Size:</span>
                          <span className="font-medium">
                            {selectedProject.size}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Completed:</span>
                          <span className="font-medium">
                            {new Date(
                              selectedProject.completedDate
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Client:</span>
                          <span className="font-medium">
                            {selectedProject.client}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Description
                      </h3>
                      <p className="text-gray-600">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Key Features
                      </h3>
                      <ul className="space-y-1">
                        {selectedProject.features.map((feature, idx) => (
                          <li
                            key={idx}
                            className="flex items-center gap-2 text-gray-600"
                          >
                            <FaLeaf className="w-3 h-3 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Challenge
                      </h3>
                      <p className="text-gray-600">
                        {selectedProject.challenges}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Solution
                      </h3>
                      <p className="text-gray-600">
                        {selectedProject.solution}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Results
                      </h3>
                      <p className="text-gray-600">{selectedProject.results}</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Tags
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Projects;
