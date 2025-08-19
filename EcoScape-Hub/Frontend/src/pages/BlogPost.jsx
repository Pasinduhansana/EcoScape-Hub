import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaTag,
  FaLeaf,
} from "react-icons/fa";
import LoadingSpinner from "../components/LoadingSpinner";

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock blog post data
  const mockPost = {
    id: id,
    title: "Creating a Pollinator-Friendly Garden with Native Plants",
    excerpt:
      "Learn how to design and plant a garden that supports local pollinators while reducing maintenance and water usage.",
    content: `
      <p>Creating a pollinator-friendly garden using native plants is one of the most rewarding and environmentally beneficial projects you can undertake. Not only will you be supporting local ecosystems, but you'll also enjoy reduced maintenance, lower water bills, and the joy of watching your garden come alive with butterflies, bees, and hummingbirds.</p>

      <h2>Why Native Plants Matter for Pollinators</h2>
      <p>Native plants have evolved alongside local pollinators for thousands of years, creating perfect partnerships. These relationships are so specialized that many pollinators rely on specific native plants for survival. When we plant non-native species, we break these crucial connections.</p>

      <p>Native plants offer several advantages:</p>
      <ul>
        <li><strong>Perfect timing:</strong> They bloom when local pollinators need them most</li>
        <li><strong>Optimal nutrition:</strong> They provide the right type of nectar and pollen</li>
        <li><strong>Host plant relationships:</strong> Many serve as host plants for butterfly and moth larvae</li>
        <li><strong>Year-round support:</strong> Different species provide resources throughout the growing season</li>
      </ul>

      <h2>Planning Your Pollinator Garden</h2>
      <p>Before you start planting, take time to plan your garden for maximum impact:</p>

      <h3>Site Assessment</h3>
      <p>Observe your space throughout the day to understand light patterns, drainage, and soil conditions. Most pollinator plants prefer full sun (6+ hours of direct sunlight), but there are native options for shadier spots too.</p>

      <h3>Bloom Succession</h3>
      <p>Plan for continuous blooms from early spring through late fall. This ensures pollinators have consistent food sources throughout their active seasons. Create a bloom calendar to visualize when each plant will flower.</p>

      <h3>Plant Diversity</h3>
      <p>Include a variety of flower shapes, sizes, and colors to attract different types of pollinators:</p>
      <ul>
        <li><strong>Flat, open flowers:</strong> Perfect for beetles and flies</li>
        <li><strong>Tubular flowers:</strong> Ideal for butterflies and hummingbirds</li>
        <li><strong>Clustered small flowers:</strong> Great for small bees and beneficial wasps</li>
        <li><strong>Single flowers:</strong> Easier for pollinators to access than double varieties</li>
      </ul>

      <h2>Essential Native Plants for Pollinators</h2>
      <p>While specific recommendations depend on your region, here are some widely beneficial native plant categories:</p>

      <h3>Early Spring Bloomers</h3>
      <ul>
        <li>Redbud (Cercis canadensis)</li>
        <li>Wild lupine (Lupinus perennis)</li>
        <li>Wild columbine (Aquilegia canadensis)</li>
      </ul>

      <h3>Summer Powerhouses</h3>
      <ul>
        <li>Purple coneflower (Echinacea purpurea)</li>
        <li>Bee balm (Monarda species)</li>
        <li>Black-eyed Susan (Rudbeckia species)</li>
        <li>Native milkweeds (Asclepias species)</li>
      </ul>

      <h3>Fall Finishers</h3>
      <ul>
        <li>New England aster (Symphyotrichum novae-angliae)</li>
        <li>Goldenrod (Solidago species)</li>
        <li>Joe Pye weed (Eutrochium purpureum)</li>
      </ul>

      <h2>Design Principles for Success</h2>
      
      <h3>Plant in Masses</h3>
      <p>Group the same species together in clusters of at least 3-5 plants. This creates visual impact and makes it easier for pollinators to find and efficiently collect resources.</p>

      <h3>Include Native Grasses</h3>
      <p>Native grasses provide structure, winter interest, and habitat for beneficial insects. They also serve as host plants for many butterfly and moth species.</p>

      <h3>Create Habitat Features</h3>
      <p>Beyond flowers, pollinators need:</p>
      <ul>
        <li><strong>Nesting sites:</strong> Leave some bare soil for ground-nesting bees</li>
        <li><strong>Shelter:</strong> Include shrubs and bunch grasses for overwintering</li>
        <li><strong>Water sources:</strong> Shallow dishes or muddy puddles for drinking and mud collection</li>
        <li><strong>Dead plant material:</strong> Leave stems and seed heads for overwintering beneficial insects</li>
      </ul>

      <h2>Maintenance for Success</h2>
      
      <h3>First Year Care</h3>
      <p>Native plants typically need regular watering their first year as they establish deep root systems. After establishment, most require minimal irrigation.</p>

      <h3>Seasonal Tasks</h3>
      <ul>
        <li><strong>Spring:</strong> Cut back dead stems, divide overcrowded perennials</li>
        <li><strong>Summer:</strong> Deadhead flowers to encourage continued blooming</li>
        <li><strong>Fall:</strong> Leave seed heads for birds and stem cavities for beneficial insects</li>
        <li><strong>Winter:</strong> Resist the urge to clean up too much - many beneficial insects overwinter in plant debris</li>
      </ul>

      <h2>Beyond Plants: Creating a Complete Ecosystem</h2>
      
      <h3>Eliminate Pesticides</h3>
      <p>Even organic pesticides can harm beneficial insects. Focus on building a balanced ecosystem that naturally controls pests through beneficial predators.</p>

      <h3>Provide Nesting Opportunities</h3>
      <p>Different pollinators have different nesting needs:</p>
      <ul>
        <li>Leave bare soil patches for ground-nesting bees</li>
        <li>Provide hollow stems and dead wood for cavity-nesting species</li>
        <li>Maintain some undisturbed areas for bumble bee colonies</li>
      </ul>

      <h2>The Rewards of Pollinator Gardening</h2>
      <p>A well-designed native pollinator garden provides benefits beyond supporting wildlife:</p>
      
      <ul>
        <li><strong>Lower maintenance:</strong> Native plants are adapted to local conditions</li>
        <li><strong>Water conservation:</strong> Deep-rooted natives need less irrigation</li>
        <li><strong>Pest control:</strong> Beneficial insects help control garden pests</li>
        <li><strong>Educational opportunities:</strong> Watch the fascinating relationships between plants and pollinators</li>
        <li><strong>Seasonal beauty:</strong> Enjoy ever-changing colors and textures throughout the year</li>
      </ul>

      <h2>Getting Started</h2>
      <p>You don't need to transform your entire landscape at once. Start with a small area and expand over time. Even a few native plants can make a difference for local pollinators.</p>

      <p>Research native plants specific to your region, visit local native plant sales, and connect with local native plant societies for advice and support. Your pollinator garden will not only beautify your space but also contribute to the health of your local ecosystem for generations to come.</p>
    `,
    author: "Sarah Martinez",
    authorBio:
      "Sarah is a certified landscape designer specializing in native plant ecosystems and pollinator habitat creation. She has over 10 years of experience helping homeowners create beautiful, sustainable gardens.",
    authorImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150",
    publishDate: "2024-01-10",
    readTime: "8 min read",
    category: "native-plants",
    tags: [
      "pollinators",
      "native plants",
      "sustainable design",
      "garden design",
      "butterflies",
      "bees",
    ],
    image:
      "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1200",
  };

  const mockRelatedPosts = [
    {
      id: "2",
      title: "Rain Garden Design: Managing Stormwater Naturally",
      excerpt:
        "Discover how rain gardens can solve drainage problems while creating beautiful landscapes.",
      image:
        "https://images.unsplash.com/photo-1534452116475-9b6b7a0b03f1?w=400",
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "Organic Lawn Care: Healthy Grass Without Chemicals",
      excerpt: "Tips for maintaining a lush, green lawn using organic methods.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
      readTime: "6 min read",
    },
    {
      id: "4",
      title: "Winter Wildlife Support: Creating Four-Season Habitat",
      excerpt:
        "Design landscapes that provide food and shelter for wildlife year-round.",
      image:
        "https://images.unsplash.com/photo-1574263867128-c8b69c0b6b66?w=400",
      readTime: "8 min read",
    },
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setPost(mockPost);
      setRelatedPosts(mockRelatedPosts);
      setLoading(false);
    }, 1000);
  }, [id]);

  const shareUrl = window.location.href;
  const shareTitle = post?.title || "";

  const socialShare = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      shareUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareTitle)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      shareUrl
    )}`,
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h2>
          <button
            onClick={() => navigate("/blog")}
            className="text-green-600 hover:text-green-500"
          >
            ← Back to Blog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="pt-20 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <button
              onClick={() => navigate("/blog")}
              className="flex items-center gap-2 text-green-600 hover:text-green-500 mb-6 font-medium"
            >
              <FaArrowLeft className="w-4 h-4" />
              Back to Blog
            </button>

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full"
                  >
                    <FaTag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-gray-600 mb-8">{post.excerpt}</p>

              {/* Author and Meta Info */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={post.authorImage}
                    alt={post.author}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{post.author}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
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
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 text-sm">Share:</span>
                  <a
                    href={socialShare.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
                  >
                    <FaFacebook className="w-4 h-4" />
                  </a>
                  <a
                    href={socialShare.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors duration-300"
                  >
                    <FaTwitter className="w-4 h-4" />
                  </a>
                  <a
                    href={socialShare.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-300"
                  >
                    <FaLinkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-lg"
          >
            <div
              className="prose prose-lg max-w-none prose-green prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>
        </div>
      </section>

      {/* Author Bio */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-green-50 rounded-2xl p-8 border border-green-100"
          >
            <div className="flex items-start gap-4">
              <img
                src={post.authorImage}
                alt={post.author}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  About {post.author}
                </h3>
                <p className="text-gray-700">{post.authorBio}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <motion.article
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {relatedPost.readTime}
                      </span>
                      <Link
                        to={`/blog/${relatedPost.id}`}
                        className="text-green-600 hover:text-green-500 font-medium text-sm"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
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
            <FaLeaf className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your Own Pollinator Garden?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let our experts help you design and install a beautiful,
              sustainable landscape that supports local wildlife and reduces
              maintenance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/services")}
                className="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-300"
              >
                View Our Services
              </button>
              <button
                onClick={() => navigate("/contact")}
                className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-green-600 transition-colors duration-300"
              >
                Get Free Consultation
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
