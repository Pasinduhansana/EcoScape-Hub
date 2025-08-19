const express = require("express");
const { body, validationResult, query } = require("express-validator");
const Project = require("../models/Project");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// Get all projects with filtering and pagination
router.get(
  "/",
  [
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive integer"),
    query("limit")
      .optional()
      .isInt({ min: 1, max: 50 })
      .withMessage("Limit must be between 1 and 50"),
    query("category")
      .optional()
      .isString()
      .withMessage("Category must be a string"),
    query("featured")
      .optional()
      .isBoolean()
      .withMessage("Featured must be a boolean"),
    query("search")
      .optional()
      .isString()
      .withMessage("Search must be a string"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const {
        page = 1,
        limit = 12,
        category,
        featured,
        search,
        status = "completed",
      } = req.query;

      // Build filter object
      const filter = { status };

      if (category) {
        filter.category = category;
      }

      if (featured !== undefined) {
        filter.featured = featured === "true";
      }

      if (search) {
        filter.$text = { $search: search };
      }

      // Calculate skip value for pagination
      const skip = (parseInt(page) - 1) * parseInt(limit);

      // Get projects with pagination
      const projects = await Project.find(filter)
        .sort({ featured: -1, createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .select("-__v");

      // Get total count for pagination
      const total = await Project.countDocuments(filter);

      res.json({
        success: true,
        data: {
          projects,
          pagination: {
            current: parseInt(page),
            total: Math.ceil(total / parseInt(limit)),
            count: projects.length,
            totalProjects: total,
          },
        },
      });
    } catch (error) {
      console.error("Get projects error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch projects",
        error: error.message,
      });
    }
  }
);

// Get single project by ID
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select("-__v");

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      data: { project },
    });
  } catch (error) {
    console.error("Get project error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to fetch project",
      error: error.message,
    });
  }
});

// Get featured projects
router.get("/featured/list", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const featuredProjects = await Project.find({
      featured: true,
      status: "completed",
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select(
        "title description category images location sustainabilityImpact"
      );

    res.json({
      success: true,
      data: { projects: featuredProjects },
    });
  } catch (error) {
    console.error("Get featured projects error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured projects",
      error: error.message,
    });
  }
});

// Get project categories with counts
router.get("/categories/list", async (req, res) => {
  try {
    const categories = await Project.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const categoryMap = {
      "residential-landscaping": "Residential Landscaping",
      "commercial-landscaping": "Commercial Landscaping",
      "sustainable-gardens": "Sustainable Gardens",
      "water-conservation": "Water Conservation",
      "native-plant-restoration": "Native Plant Restoration",
      "green-roofs": "Green Roofs",
      "rain-gardens": "Rain Gardens",
      xeriscaping: "Xeriscaping",
      "organic-gardening": "Organic Gardening",
      permaculture: "Permaculture",
    };

    const formattedCategories = categories.map((cat) => ({
      slug: cat._id,
      name: categoryMap[cat._id] || cat._id,
      count: cat.count,
    }));

    res.json({
      success: true,
      data: { categories: formattedCategories },
    });
  } catch (error) {
    console.error("Get categories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
});

// Create new project (Admin only)
router.post(
  "/",
  adminAuth,
  [
    body("title")
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage("Title must be between 5 and 100 characters"),
    body("description")
      .trim()
      .isLength({ min: 20, max: 1000 })
      .withMessage("Description must be between 20 and 1000 characters"),
    body("category")
      .isIn([
        "residential-landscaping",
        "commercial-landscaping",
        "sustainable-gardens",
        "water-conservation",
        "native-plant-restoration",
        "green-roofs",
        "rain-gardens",
        "xeriscaping",
        "organic-gardening",
        "permaculture",
      ])
      .withMessage("Invalid category"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errors.array(),
        });
      }

      const project = new Project(req.body);
      await project.save();

      res.status(201).json({
        success: true,
        message: "Project created successfully",
        data: { project },
      });
    } catch (error) {
      console.error("Create project error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create project",
        error: error.message,
      });
    }
  }
);

// Update project (Admin only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      data: { project },
    });
  } catch (error) {
    console.error("Update project error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update project",
      error: error.message,
    });
  }
});

// Delete project (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid project ID format",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to delete project",
      error: error.message,
    });
  }
});

module.exports = router;
