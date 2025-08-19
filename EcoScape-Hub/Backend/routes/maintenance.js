const express = require("express");
const { body, validationResult } = require("express-validator");
const MaintenanceRequest = require("../models/MaintenanceRequest");
const Customer = require("../models/Customer");
const { auth } = require("../middleware/auth");
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

// GET all maintenance requests
router.get("/", auth, async (req, res) => {
  try {
    const { page = 1, limit = 10, status, priority, customerId } = req.query;

    let query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by priority
    if (priority) {
      query.priority = priority;
    }

    // Filter by customer (for customer-specific requests)
    if (customerId) {
      query.customer = customerId;
    }

    const requests = await MaintenanceRequest.find(query)
      .populate("customer", "name email phone registrationNumber")
      .populate("assignedTo", "name email")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await MaintenanceRequest.countDocuments(query);

    res.json({
      success: true,
      data: {
        requests,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
      },
    });
  } catch (error) {
    console.error("Get maintenance requests error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch maintenance requests",
    });
  }
});

// GET maintenance request by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id)
      .populate("customer", "name email phone address registrationNumber")
      .populate("assignedTo", "name email")
      .populate("notes.author", "name");

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Maintenance request not found",
      });
    }

    res.json({
      success: true,
      data: request,
    });
  } catch (error) {
    console.error("Get maintenance request error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch maintenance request",
    });
  }
});

// POST create new maintenance request
router.post(
  "/",
  [
    auth,
    body("customer").notEmpty().withMessage("Customer ID is required"),
    body("serviceType").notEmpty().withMessage("Service type is required"),
    body("description")
      .trim()
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters"),
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
        customer,
        serviceType,
        description,
        priority,
        preferredDate,
        serviceLocation,
        estimatedCost,
      } = req.body;

      // Verify customer exists
      const customerExists = await Customer.findById(customer);
      if (!customerExists) {
        return res.status(404).json({
          success: false,
          message: "Customer not found",
        });
      }

      const maintenanceRequest = new MaintenanceRequest({
        customer,
        serviceType,
        description,
        priority,
        preferredDate,
        serviceLocation,
        estimatedCost,
        notes: [
          {
            author: req.user.userId,
            message: "Maintenance request created",
            timestamp: new Date(),
          },
        ],
      });

      await maintenanceRequest.save();
      await maintenanceRequest.populate(
        "customer",
        "name email phone registrationNumber"
      );

      res.status(201).json({
        success: true,
        message: "Maintenance request created successfully",
        data: maintenanceRequest,
      });
    } catch (error) {
      console.error("Create maintenance request error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create maintenance request",
      });
    }
  }
);

// PUT update maintenance request status (Admin only)
router.put(
  "/:id/status",
  [
    auth,
    adminAuth,
    body("status")
      .isIn(["pending", "scheduled", "in-progress", "completed", "cancelled"])
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

      const { status, scheduledDate, assignedTo, notes } = req.body;

      const request = await MaintenanceRequest.findById(req.params.id);
      if (!request) {
        return res.status(404).json({
          success: false,
          message: "Maintenance request not found",
        });
      }

      // Update status
      request.status = status;

      // Update scheduled date if provided
      if (scheduledDate) {
        request.scheduledDate = scheduledDate;
      }

      // Update assigned staff if provided
      if (assignedTo) {
        request.assignedTo = assignedTo;
      }

      // Mark as completed if status is completed
      if (status === "completed") {
        request.completedDate = new Date();

        // Update customer service count
        const customer = await Customer.findById(request.customer);
        if (customer) {
          customer.totalServicesCount += 1;
          customer.totalSpent +=
            request.finalCost || request.estimatedCost || 0;
          customer.lastServiceDate = new Date();
          await customer.save();
        }
      }

      // Add status update note
      request.notes.push({
        author: req.user.userId,
        message: notes || `Status updated to ${status}`,
        timestamp: new Date(),
      });

      await request.save();
      await request.populate("customer", "name email phone registrationNumber");
      await request.populate("assignedTo", "name email");

      res.json({
        success: true,
        message: "Maintenance request updated successfully",
        data: request,
      });
    } catch (error) {
      console.error("Update maintenance request error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update maintenance request",
      });
    }
  }
);

// PUT update maintenance request
router.put("/:id", [auth, adminAuth], async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Maintenance request not found",
      });
    }

    // Update request data
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] !== undefined && key !== "notes") {
        request[key] = req.body[key];
      }
    });

    // Add update note
    request.notes.push({
      author: req.user.userId,
      message: "Maintenance request updated",
      timestamp: new Date(),
    });

    await request.save();
    await request.populate("customer", "name email phone registrationNumber");
    await request.populate("assignedTo", "name email");

    res.json({
      success: true,
      message: "Maintenance request updated successfully",
      data: request,
    });
  } catch (error) {
    console.error("Update maintenance request error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update maintenance request",
    });
  }
});

// DELETE maintenance request (Admin only)
router.delete("/:id", auth, adminAuth, async (req, res) => {
  try {
    const request = await MaintenanceRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Maintenance request not found",
      });
    }

    // Only allow deletion of pending or cancelled requests
    if (!["pending", "cancelled"].includes(request.status)) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete maintenance request with current status",
      });
    }

    await MaintenanceRequest.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Maintenance request deleted successfully",
    });
  } catch (error) {
    console.error("Delete maintenance request error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete maintenance request",
    });
  }
});

// POST add note to maintenance request
router.post(
  "/:id/notes",
  [
    auth,
    body("message")
      .trim()
      .isLength({ min: 1 })
      .withMessage("Note message is required"),
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

      const { message, isCustomerVisible = true } = req.body;

      const request = await MaintenanceRequest.findById(req.params.id);
      if (!request) {
        return res.status(404).json({
          success: false,
          message: "Maintenance request not found",
        });
      }

      request.notes.push({
        author: req.user.userId,
        message,
        timestamp: new Date(),
        isCustomerVisible,
      });

      await request.save();
      await request.populate("notes.author", "name");

      res.json({
        success: true,
        message: "Note added successfully",
        data: request.notes[request.notes.length - 1],
      });
    } catch (error) {
      console.error("Add note error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to add note",
      });
    }
  }
);

// GET maintenance request statistics
router.get("/stats/overview", auth, adminAuth, async (req, res) => {
  try {
    const totalRequests = await MaintenanceRequest.countDocuments();
    const pendingRequests = await MaintenanceRequest.countDocuments({
      status: "pending",
    });
    const inProgressRequests = await MaintenanceRequest.countDocuments({
      status: "in-progress",
    });
    const completedThisMonth = await MaintenanceRequest.countDocuments({
      status: "completed",
      completedDate: { $gte: new Date(new Date().setDate(1)) },
    });

    const serviceTypeStats = await MaintenanceRequest.aggregate([
      {
        $group: {
          _id: "$serviceType",
          count: { $sum: 1 },
        },
      },
    ]);

    const priorityStats = await MaintenanceRequest.aggregate([
      {
        $group: {
          _id: "$priority",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalRequests,
        pendingRequests,
        inProgressRequests,
        completedThisMonth,
        serviceTypeStats,
        priorityStats,
      },
    });
  } catch (error) {
    console.error("Get maintenance stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
});

// Generate maintenance service report
router.get("/reports/services", auth, adminAuth, async (req, res) => {
  try {
    const { startDate, endDate, status, serviceType } = req.query;

    let query = {};

    if (startDate && endDate) {
      query.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    if (status) {
      query.status = status;
    }

    if (serviceType) {
      query.serviceType = serviceType;
    }

    const requests = await MaintenanceRequest.find(query)
      .populate("customer", "name email registrationNumber")
      .populate("assignedTo", "name")
      .select("-notes -__v")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: {
        requests,
        totalCount: requests.length,
        generatedAt: new Date(),
        reportPeriod: { startDate, endDate },
        filters: { status, serviceType },
      },
    });
  } catch (error) {
    console.error("Generate maintenance report error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate report",
    });
  }
});

module.exports = router;
