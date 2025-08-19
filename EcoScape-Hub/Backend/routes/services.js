const express = require("express");
const { body, validationResult } = require("express-validator");
const Service = require("../models/Service");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// Get all services with filtering
router.get("/", async (req, res) => {
  try {
    const { category, featured, active = true } = req.query;

    const filter = { active: active === "true" };

    if (category) {
      filter.category = category;
    }

    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    const services = await Service.find(filter)
      .sort({ featured: -1, "metadata.popularityScore": -1 })
      .select("-__v");

    res.json({
      success: true,
      data: { services },
    });
  } catch (error) {
    console.error("Get services error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
});

// Get single service by slug or ID
router.get("/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;

    // Try to find by slug first, then by ID
    let service = await Service.findOne({ slug: identifier, active: true });

    if (!service) {
      service = await Service.findById(identifier);
    }

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      data: { service },
    });
  } catch (error) {
    console.error("Get service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service",
      error: error.message,
    });
  }
});

// Get featured services
router.get("/featured/list", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 6;

    const featuredServices = await Service.find({
      featured: true,
      active: true,
    })
      .sort({ "metadata.popularityScore": -1 })
      .limit(limit)
      .select("name slug description.short category pricing images");

    res.json({
      success: true,
      data: { services: featuredServices },
    });
  } catch (error) {
    console.error("Get featured services error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch featured services",
      error: error.message,
    });
  }
});

// Get service categories
router.get("/categories/list", async (req, res) => {
  try {
    const categories = await Service.aggregate([
      { $match: { active: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const categoryMap = {
      "design-consultation": "Design & Consultation",
      installation: "Installation Services",
      maintenance: "Maintenance & Care",
      restoration: "Restoration Services",
      consultation: "Expert Consultation",
      education: "Education & Workshops",
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
    console.error("Get service categories error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch service categories",
      error: error.message,
    });
  }
});

// Create new service (Admin only)
router.post(
  "/",
  adminAuth,
  [
    body("name")
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage("Name must be between 3 and 100 characters"),
    body("description.short")
      .trim()
      .isLength({ min: 20, max: 200 })
      .withMessage("Short description must be between 20 and 200 characters"),
    body("description.detailed")
      .trim()
      .isLength({ min: 50, max: 2000 })
      .withMessage(
        "Detailed description must be between 50 and 2000 characters"
      ),
    body("category")
      .isIn([
        "design-consultation",
        "installation",
        "maintenance",
        "restoration",
        "consultation",
        "education",
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

      const service = new Service(req.body);
      await service.save();

      res.status(201).json({
        success: true,
        message: "Service created successfully",
        data: { service },
      });
    } catch (error) {
      console.error("Create service error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create service",
        error: error.message,
      });
    }
  }
);

// Update service (Admin only)
router.put("/:id", adminAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service updated successfully",
      data: { service },
    });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update service",
      error: error.message,
    });
  }
});

// Delete service (Admin only)
router.delete("/:id", adminAuth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Delete service error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete service",
      error: error.message,
    });
  }
});

module.exports = router;
