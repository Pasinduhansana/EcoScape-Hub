import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaArrowRight,
  FaSearch,
  FaLeaf,
  FaTag,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Posts" },
    { id: "sustainable-design", name: "Sustainable Design" },
    { id: "native-plants", name: "Native Plants" },
    { id: "water-conservation", name: "Water Conservation" },
    { id: "garden-maintenance", name: "Garden Maintenance" },
    { id: "wildlife-habitat", name: "Wildlife Habitat" },
  ];

  const mockPosts = [
    {
      id: "1",
      title: "Creating a Pollinator-Friendly Garden with Native Plants",
      excerpt:
        "Learn how to design and plant a garden that supports local pollinators while reducing maintenance and water usage.",
      content: "Full article content here...",
      author: "Sarah Martinez",
      authorImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
      publishDate: "2024-01-10",
      readTime: "5 min read",
      category: "native-plants",
      tags: ["pollinators", "native plants", "sustainable design"],
      image:
        "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600",
      featured: true,
    },
    {
      id: "2",
      title: "Rain Garden Design: Managing Stormwater Naturally",
      excerpt:
        "Discover how rain gardens can solve drainage problems while creating beautiful, low-maintenance landscapes.",
      content: "Full article content here...",
      author: "Mike Chen",
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      publishDate: "2024-01-08",
      readTime: "7 min read",
      category: "water-conservation",
      tags: ["rain gardens", "stormwater", "sustainable design"],
      image:
        "https://images.unsplash.com/photo-1534452116475-9b6b7a0b03f1?w=600",
      featured: false,
    },
    {
      id: "3",
      title: "Organic Lawn Care: Healthy Grass Without Chemicals",
      excerpt:
        "Tips and techniques for maintaining a lush, green lawn using organic methods and natural fertilizers.",
      content: "Full article content here...",
      author: "Emily Davis",
      authorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      publishDate: "2024-01-05",
      readTime: "6 min read",
      category: "garden-maintenance",
      tags: ["organic", "lawn care", "maintenance"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600",
      featured: false,
    },
    {
      id: "4",
      title: "Winter Wildlife Support: Creating Four-Season Habitat",
      excerpt:
        "How to design landscapes that provide food and shelter for wildlife throughout the year.",
      content: "Full article content here...",
      author: "David Wilson",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      publishDate: "2024-01-03",
      readTime: "8 min read",
      category: "wildlife-habitat",
      tags: ["wildlife", "winter garden", "habitat"],
      image:
        "https://images.unsplash.com/photo-1574263867128-c8b69c0b6b66?w=600",
      featured: false,
    },
    {
      id: "5",
      title: "Drought-Resistant Landscaping for Climate Resilience",
      excerpt:
        "Planning and planting strategies for creating beautiful gardens that thrive in changing climate conditions.",
      content: "Full article content here...",
      author: "Lisa Rodriguez",
      authorImage:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
      publishDate: "2024-01-01",
      readTime: "9 min read",
      category: "sustainable-design",
      tags: ["drought-resistant", "climate change", "resilience"],
      image:
        "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=600",
      featured: true,
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

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
              EcoScape <span className="text-green-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover tips, techniques, and inspiration for creating
              sustainable, beautiful landscapes that work in harmony with
              nature.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
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
                placeholder="Search articles..."
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
                  className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
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
        </div>
      </section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Featured Articles
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredPosts.map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Featured
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="w-6 h-6 rounded-full"
                          />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaCalendarAlt className="w-3 h-3" />
                          <span>
                            {new Date(post.publishDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FaClock className="w-3 h-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-green-600 hover:text-green-500 font-medium group"
                      >
                        Read More
                        <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Regular Posts */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Latest Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.authorImage}
                          alt={post.author}
                          className="w-5 h-5 rounded-full"
                        />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock className="w-3 h-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <Link
                      to={`/blog/${post.id}`}
                      className="inline-flex items-center gap-2 text-green-600 hover:text-green-500 font-medium group text-sm"
                    >
                      Read More
                      <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <FaLeaf className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  No articles found matching your criteria.
                </p>
                <p className="text-gray-400">
                  Try adjusting your search or filter options.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <FaLeaf className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with EcoScape Tips
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get the latest sustainable landscaping tips, seasonal advice, and
              exclusive content delivered to your inbox monthly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <button className="bg-white text-green-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-80 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
