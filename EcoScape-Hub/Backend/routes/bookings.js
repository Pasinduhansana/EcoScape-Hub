const express = require("express");
const { body, validationResult } = require("express-validator");
const Booking = require("../models/Booking");
const Service = require("../models/Service");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// Get user's bookings
router.get("/", auth, async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const filter = { user: req.user.userId };

    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookings = await Booking.find(filter)
      .populate("service", "name slug category description.short pricing")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v");

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: bookings.length,
          totalBookings: total,
        },
      },
    });
  } catch (error) {
    console.error("Get bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
});

// Get single booking
router.get("/:id", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email phone")
      .populate("service", "name slug category description pricing");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if user owns this booking or is admin
    if (
      booking.user._id.toString() !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.json({
      success: true,
      data: { booking },
    });
  } catch (error) {
    console.error("Get booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booking",
      error: error.message,
    });
  }
});

// Create new booking
router.post(
  "/",
  auth,
  [
    body("service").isMongoId().withMessage("Valid service ID is required"),
    body("contactInfo.name")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),
    body("contactInfo.email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("contactInfo.phone")
      .trim()
      .isMobilePhone()
      .withMessage("Valid phone number is required"),
    body("projectDetails.location.street")
      .trim()
      .notEmpty()
      .withMessage("Street address is required"),
    body("projectDetails.location.city")
      .trim()
      .notEmpty()
      .withMessage("City is required"),
    body("projectDetails.location.state")
      .trim()
      .notEmpty()
      .withMessage("State is required"),
    body("projectDetails.location.zipCode")
      .trim()
      .notEmpty()
      .withMessage("Zip code is required"),
    body("projectDetails.description")
      .trim()
      .isLength({ min: 20, max: 1000 })
      .withMessage(
        "Project description must be between 20 and 1000 characters"
      ),
    body("projectDetails.propertyType")
      .isIn(["residential", "commercial", "municipal"])
      .withMessage("Invalid property type"),
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

      // Verify service exists
      const service = await Service.findById(req.body.service);
      if (!service || !service.active) {
        return res.status(400).json({
          success: false,
          message: "Service not found or not available",
        });
      }

      const bookingData = {
        ...req.body,
        user: req.user.userId,
      };

      const booking = new Booking(bookingData);
      await booking.save();

      // Populate the booking with service details for response
      await booking.populate("service", "name slug category description.short");

      res.status(201).json({
        success: true,
        message: "Booking created successfully",
        data: { booking },
      });
    } catch (error) {
      console.error("Create booking error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create booking",
        error: error.message,
      });
    }
  }
);

// Update booking status (Admin only)
router.put(
  "/:id/status",
  adminAuth,
  [
    body("status")
      .isIn(["pending", "confirmed", "in-progress", "completed", "cancelled"])
      .withMessage("Invalid status"),
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

      const { status } = req.body;

      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        {
          $set: { status },
          $push: {
            communication: {
              type: "email",
              subject: `Booking status updated to ${status}`,
              notes: `Status changed by admin to ${status}`,
            },
          },
        },
        { new: true }
      ).populate("service", "name slug");

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      res.json({
        success: true,
        message: "Booking status updated successfully",
        data: { booking },
      });
    } catch (error) {
      console.error("Update booking status error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update booking status",
        error: error.message,
      });
    }
  }
);

// Add communication note to booking (Admin only)
router.post(
  "/:id/communication",
  adminAuth,
  [
    body("type")
      .isIn(["email", "phone", "meeting", "site-visit"])
      .withMessage("Invalid communication type"),
    body("subject").trim().notEmpty().withMessage("Subject is required"),
    body("notes").trim().notEmpty().withMessage("Notes are required"),
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

      const communication = {
        ...req.body,
        date: new Date(),
      };

      const booking = await Booking.findByIdAndUpdate(
        req.params.id,
        { $push: { communication } },
        { new: true }
      );

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: "Booking not found",
        });
      }

      res.json({
        success: true,
        message: "Communication added successfully",
        data: { booking },
      });
    } catch (error) {
      console.error("Add communication error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add communication",
        error: error.message,
      });
    }
  }
);

// Get all bookings (Admin only)
router.get("/admin/all", adminAuth, async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;

    const filter = {};

    if (status) {
      filter.status = status;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const bookings = await Booking.find(filter)
      .populate("user", "name email phone")
      .populate("service", "name slug category")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select("-__v");

    const total = await Booking.countDocuments(filter);

    res.json({
      success: true,
      data: {
        bookings,
        pagination: {
          current: parseInt(page),
          total: Math.ceil(total / parseInt(limit)),
          count: bookings.length,
          totalBookings: total,
        },
      },
    });
  } catch (error) {
    console.error("Get all bookings error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch bookings",
      error: error.message,
    });
  }
});

// Cancel booking
router.put("/:id/cancel", auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    // Only allow cancellation if booking is pending or confirmed
    if (!["pending", "confirmed"].includes(booking.status)) {
      return res.status(400).json({
        success: false,
        message: "Booking cannot be cancelled at this stage",
      });
    }

    booking.status = "cancelled";
    booking.communication.push({
      type: "email",
      subject: "Booking cancelled by customer",
      notes: "Customer cancelled the booking",
      date: new Date(),
    });

    await booking.save();

    res.json({
      success: true,
      message: "Booking cancelled successfully",
      data: { booking },
    });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to cancel booking",
      error: error.message,
    });
  }
});

module.exports = router;
