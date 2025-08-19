const express = require("express");
const { body, validationResult } = require("express-validator");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// Simple blog post model (you can expand this or use a dedicated CMS)
const blogPosts = [
  {
    id: "1",
    title: "10 Native Plants That Will Transform Your Garden",
    slug: "10-native-plants-transform-garden",
    excerpt:
      "Discover the power of native plants in creating a sustainable, low-maintenance garden that supports local wildlife.",
    content: `Native plants are the backbone of sustainable landscaping. They require less water, provide food for local wildlife, and create beautiful, resilient gardens. Here are our top 10 recommendations...`,
    author: "Sarah Green",
    publishDate: "2024-01-15",
    category: "Sustainable Gardening",
    tags: ["native plants", "sustainability", "wildlife", "low-maintenance"],
    image: "/images/blog/native-plants.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Water-Wise Landscaping: A Complete Guide",
    slug: "water-wise-landscaping-complete-guide",
    excerpt:
      "Learn how to create a beautiful landscape that conserves water and thrives in drought conditions.",
    content: `Water conservation is crucial in modern landscaping. This comprehensive guide covers everything from plant selection to irrigation systems...`,
    author: "Mike Rodriguez",
    publishDate: "2024-01-10",
    category: "Water Conservation",
    tags: ["water conservation", "drought-resistant", "xeriscaping"],
    image: "/images/blog/water-wise.jpg",
    featured: false,
  },
  {
    id: "3",
    title: "Creating Wildlife Habitats in Your Backyard",
    slug: "creating-wildlife-habitats-backyard",
    excerpt:
      "Transform your outdoor space into a thriving ecosystem that supports birds, butterflies, and beneficial insects.",
    content: `Your backyard can become a sanctuary for local wildlife. Here's how to design spaces that support biodiversity...`,
    author: "Emily Chen",
    publishDate: "2024-01-05",
    category: "Wildlife Conservation",
    tags: ["wildlife habitat", "biodiversity", "native plants", "ecosystem"],
    image: "/images/blog/wildlife-habitat.jpg",
    featured: true,
  },
];

// Get all blog posts
router.get("/", async (req, res) => {
  try {
    const { category, featured, limit = 10, page = 1 } = req.query;

    let filteredPosts = [...blogPosts];

    if (category) {
      filteredPosts = filteredPosts.filter((post) =>
        post.category.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (featured === "true") {
      filteredPosts = filteredPosts.filter((post) => post.featured);
    }

    // Sort by publish date (newest first)
    filteredPosts.sort(
      (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
    );

    // Pagination
    const startIndex = (parseInt(page) - 1) * parseInt(limit);
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        posts: paginatedPosts,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(filteredPosts.length / parseInt(limit)),
          count: paginatedPosts.length,
          totalPosts: filteredPosts.length,
        },
      },
    });
  } catch (error) {
    console.error("Get blog posts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog posts",
      error: error.message,
    });
  }
});

// Get single blog post by slug
router.get("/:slug", async (req, res) => {
  try {
    const post = blogPosts.find((p) => p.slug === req.params.slug);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Blog post not found",
      });
    }

    // Get related posts (same category, excluding current post)
    const relatedPosts = blogPosts
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3);

    res.json({
      success: true,
      data: {
        post,
        relatedPosts,
      },
    });
  } catch (error) {
    console.error("Get blog post error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog post",
      error: error.message,
    });
  }
});

// Get blog categories
router.get("/categories/list", async (req, res) => {
  try {
    const categories = [...new Set(blogPosts.map((post) => post.category))];

    const categoriesWithCounts = categories.map((category) => ({
      name: category,
      slug: category.toLowerCase().replace(/\s+/g, "-"),
      count: blogPosts.filter((post) => post.category === category).length,
    }));

    res.json({
      success: true,
      data: { categories: categoriesWithCounts },
    });
  } catch (error) {
    console.error("Get blog categories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch blog categories",
      error: error.message,
    });
  }
});

// Get featured blog posts
router.get("/featured/list", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 3;

    const featuredPosts = blogPosts
      .filter((post) => post.featured)
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, limit)
      .map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        publishDate: post.publishDate,
        category: post.category,
        image: post.image,
      }));

    res.json({
      success: true,
      data: { posts: featuredPosts },
    });
  } catch (error) {
    console.error("Get featured blog posts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured blog posts",
      error: error.message,
    });
  }
});

// Search blog posts
router.get("/search/:query", async (req, res) => {
  try {
    const { query } = req.params;
    const searchQuery = query.toLowerCase();

    const searchResults = blogPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery) ||
        post.excerpt.toLowerCase().includes(searchQuery) ||
        post.content.toLowerCase().includes(searchQuery) ||
        post.tags.some((tag) => tag.toLowerCase().includes(searchQuery))
    );

    res.json({
      success: true,
      data: {
        posts: searchResults,
        query: query,
        count: searchResults.length,
      },
    });
  } catch (error) {
    console.error("Search blog posts error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to search blog posts",
      error: error.message,
    });
  }
});

module.exports = router;
