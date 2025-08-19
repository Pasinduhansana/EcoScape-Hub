const express = require("express");
const { body, validationResult } = require("express-validator");
const Customer = require("../models/Customer");
const MaintenanceRequest = require("../models/MaintenanceRequest");
const { auth } = require("../middleware/auth");
const mongoose = require("mongoose");
const router = express.Router();

// Middleware to check admin role
const adminAuth = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Access denied. Admin privileges required.",
    });
  }
  next();
};

// GET all customers (Admin only)
router.get("/", auth, adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status, loyaltyStatus } = req.query;

    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { registrationNumber: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by status
    if (status && status !== "all") {
      query.status = status;
    }

    // Filter by loyalty status
    if (loyaltyStatus && loyaltyStatus !== "all") {
      query.loyaltyStatus = loyaltyStatus;
    }

    const customers = await Customer.find(query)
      .populate("referredBy", "name registrationNumber")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Customer.countDocuments(query);

    res.json({
      success: true,
      data: {
        customers,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      },
    });
  } catch (error) {
    console.error("Get customers error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
    });
  }
});

// GET customer by ID
router.get("/:id", auth, adminAuth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "referredBy.customer",
      "name registrationNumber email"
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Get maintenance requests for this customer
    const maintenanceRequests = await MaintenanceRequest.find({
      customer: req.params.id,
    })
      .populate("assignedTo", "name")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        customer,
        maintenanceRequests,
      },
    });
  } catch (error) {
    console.error("Get customer error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer",
    });
  }
});

// POST create new customer
router.post(
  "/",
  [
    auth,
    adminAuth,
    body("name")
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("phone").notEmpty().withMessage("Phone number is required"),
    body("address.street").notEmpty().withMessage("Street address is required"),
    body("address.city").notEmpty().withMessage("City is required"),
    body("address.state").notEmpty().withMessage("State is required"),
    body("address.zipCode").notEmpty().withMessage("ZIP code is required"),
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
        name,
        email,
        phone,
        dateOfBirth,
        address,
        preferences,
        status,
        referredBy,
      } = req.body;

      // Check if customer already exists
      const existingCustomer = await Customer.findOne({ email });
      if (existingCustomer) {
        return res.status(409).json({
          success: false,
          message: "Customer with this email already exists",
        });
      }

      // Handle referredBy validation - Fix for ObjectId error
      let validReferredBy = null;
      let referringCustomer = null;

      if (referredBy && referredBy.trim() !== "") {
        // Validate if it's a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(referredBy)) {
          return res.status(400).json({
            success: false,
            message: "Invalid referring customer ID",
          });
        }

        referringCustomer = await Customer.findById(referredBy);
        if (!referringCustomer) {
          return res.status(400).json({
            success: false,
            message: "Referring customer not found",
          });
        }
        validReferredBy = referredBy;
      }

      // Create customer data object
      const customerData = {
        name,
        email,
        phone,
        address,
        status: status || "active",
        referralSource: validReferredBy ? "referral" : "website",
      };

      // Add optional fields only if they exist and are valid
      if (dateOfBirth) customerData.dateOfBirth = dateOfBirth;
      if (preferences) customerData.preferences = preferences;
      if (validReferredBy) customerData.referredBy = validReferredBy;

      const customer = new Customer(customerData);
      await customer.save();

      // Update referring customer's referral count
      if (referringCustomer) {
        referringCustomer.totalReferrals += 1;
        referringCustomer.loyaltyPoints += 100; // Bonus points for referral
        await referringCustomer.save();
      }

      // Populate the response
      await customer.populate("referredBy", "name registrationNumber");

      res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: customer,
      });
    } catch (error) {
      console.error("Create customer error:", error);

      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Customer with this email already exists",
        });
      }

      res.status(500).json({
        success: false,
        message: "Failed to create customer",
      });
    }
  }
);

// GET customer statistics (Admin only)
router.get("/stats/overview", auth, adminAuth, async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const activeCustomers = await Customer.countDocuments({ status: "active" });
    const loyaltyMembers = await Customer.countDocuments({
      loyaltyStatus: { $in: ["silver", "gold", "platinum"] },
    });

    const totalRevenueResult = await Customer.aggregate([
      { $group: { _id: null, total: { $sum: "$totalSpent" } } },
    ]);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const newThisMonth = await Customer.countDocuments({
      registrationDate: { $gte: thisMonth },
    });

    res.json({
      success: true,
      data: {
        totalCustomers,
        activeCustomers,
        loyaltyMembers,
        totalRevenue: totalRevenueResult[0]?.total || 0,
        newThisMonth,
      },
    });
  } catch (error) {
    console.error("Get stats overview error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
});

// GET single customer (Admin only)
router.get("/:id", auth, adminAuth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "referredBy",
      "name registrationNumber"
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error("Get customer error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer",
    });
  }
});

// PUT update customer
router.put(
  "/:id",
  [
    auth,
    adminAuth,
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters"),
    body("email")
      .optional()
      .isEmail()
      .withMessage("Please enter a valid email"),
    body("phone")
      .optional()
      .notEmpty()
      .withMessage("Phone number cannot be empty"),
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

      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      // Handle referredBy validation for updates
      const updateData = { ...req.body };

      if ("referredBy" in updateData) {
        if (!updateData.referredBy || updateData.referredBy.trim() === "") {
          updateData.referredBy = null;
        } else if (!mongoose.Types.ObjectId.isValid(updateData.referredBy)) {
          return res.status(400).json({
            success: false,
            message: "Invalid referring customer ID",
          });
        }
      }

      // Update customer data
      Object.keys(updateData).forEach((key) => {
        if (updateData[key] !== undefined) {
          customer[key] = updateData[key];
        }
      });

      await customer.save();
      await customer.populate("referredBy", "name registrationNumber");

      res.json({
        success: true,
        message: "Customer updated successfully",
        data: customer,
      });
    } catch (error) {
      console.error("Update customer error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update customer",
      });
    }
  }
);

// DELETE customer
router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Check if customer has active maintenance requests
    const activeRequests = await MaintenanceRequest.countDocuments({
      customer: req.params.id,
      status: { $in: ["pending", "scheduled", "in-progress"] },
    });

    if (activeRequests > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete customer with active maintenance requests",
      });
    }

    await Customer.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete customer",
    });
  }
});

// GET customer statistics
router.get("/stats/overview", auth, adminAuth, async (req, res) => {
  try {
    const totalCustomers = await Customer.countDocuments();
    const activeCustomers = await Customer.countDocuments({ status: "active" });
    const loyaltyMembers = await Customer.countDocuments({
      loyaltyStatus: { $in: ["silver", "gold", "platinum"] },
    });

    const totalRevenueResult = await Customer.aggregate([
      { $group: { _id: null, total: { $sum: "$totalSpent" } } },
    ]);

    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    const newThisMonth = await Customer.countDocuments({
      registrationDate: { $gte: thisMonth },
    });

    res.json({
      success: true,
      data: {
        totalCustomers,
        activeCustomers,
        loyaltyMembers,
        totalRevenue: totalRevenueResult[0]?.total || 0,
        newThisMonth,
      },
    });
  } catch (error) {
    console.error("Get stats overview error:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred",
    });
  }
});

// Generate customer report
router.get("/reports/customers", auth, adminAuth, async (req, res) => {
  try {
    const { startDate, endDate, format = "json" } = req.query;

    let query = {};
    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const customers = await Customer.find(query)
      .populate("referredBy.customer", "name registrationNumber")
      .select("-__v")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        customers,
        totalCount: customers.length,
        generatedAt: new Date(),
        reportPeriod: { startDate, endDate },
      },
    });
  } catch (error) {
    console.error("Generate report error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate report",
    });
  }
});

router.post(
  "/",
  [
    auth,
    adminAuth,
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").trim().notEmpty().withMessage("Phone number is required"),
    body("address.street")
      .trim()
      .notEmpty()
      .withMessage("Street address is required"),
    body("address.city").trim().notEmpty().withMessage("City is required"),
    body("address.state").trim().notEmpty().withMessage("State is required"),
    body("address.zipCode")
      .trim()
      .notEmpty()
      .withMessage("ZIP code is required"),
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
        name,
        email,
        phone,
        dateOfBirth,
        address,
        preferences,
        status,
        referredBy,
      } = req.body;

      // Check if email already exists
      const existingCustomer = await Customer.findOne({ email });

      if (existingCustomer) {
        return res.status(400).json({
          success: false,
          message: "Customer with this email already exists",
        });
      }

      // Validate referring customer if provided
      let referringCustomer = null;
      if (referredBy) {
        referringCustomer = await Customer.findById(referredBy);
        if (!referringCustomer) {
          return res.status(400).json({
            success: false,
            message: "Referring customer not found",
          });
        }
      }

      // Create new customer
      const customerData = {
        name,
        email,
        phone,
        address,
        status: status || "active",
        referralSource: referredBy ? "referral" : "website",
      };

      // Add optional fields
      if (dateOfBirth) customerData.dateOfBirth = dateOfBirth;
      if (preferences) customerData.preferences = preferences;
      if (referredBy) customerData.referredBy = referredBy;

      const customer = new Customer(customerData);
      await customer.save();

      // Update referring customer's referral count
      if (referringCustomer) {
        referringCustomer.totalReferrals += 1;
        await referringCustomer.save();
      }

      // Populate the response
      await customer.populate("referredBy", "name registrationNumber");

      res.status(201).json({
        success: true,
        message: "Customer created successfully",
        data: customer,
      });
    } catch (error) {
      console.error("Create customer error:", error);

      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Customer with this email already exists",
        });
      }

      res.status(500).json({
        success: false,
        message: "Server error occurred",
      });
    }
  }
);

router.get("/:id", auth, adminAuth, async (req, res) => {
  try {
    const customer = await Customer.findById(req.params.id).populate(
      "referredBy",
      "name registrationNumber"
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error("Get customer error:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred",
    });
  }
});

router.put(
  "/:id",
  [
    auth,
    adminAuth,
    body("name").optional().trim().notEmpty(),
    body("email").optional().isEmail(),
    body("phone").optional().trim().notEmpty(),
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

      const updateData = { ...req.body };

      if ("referredBy" in updateData) {
        if (!updateData.referredBy || updateData.referredBy.trim() === "") {
          updateData.referredBy = null;
        } else if (!mongoose.Types.ObjectId.isValid(updateData.referredBy)) {
          return res.status(400).json({
            success: false,
            message: "Invalid referring customer ID",
          });
        }
      }

      const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: true }
      ).populate("referredBy", "name registrationNumber");

      if (!customer) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      res.json({
        success: true,
        message: "Customer updated successfully",
        data: customer,
      });
    } catch (error) {
      console.error("Update customer error:", error);
      res.status(500).json({
        success: false,
        message: "Server error occurred",
      });
    }
  }
);

router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error("Delete customer error:", error);
    res.status(500).json({
      success: false,
      message: "Server error occurred",
    });
  }
});

module.exports = router;
