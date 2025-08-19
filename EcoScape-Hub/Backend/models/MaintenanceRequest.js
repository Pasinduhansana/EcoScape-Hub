const mongoose = require("mongoose");

const maintenanceRequestSchema = new mongoose.Schema(
  {
    // Customer Information
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },

    // Request Details
    requestNumber: {
      type: String,
      unique: true,
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
      enum: [
        "landscaping",
        "maintenance",
        "design",
        "installation",
        "cleanup",
        "pest-control",
        "irrigation",
      ],
    },

    description: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },

    // Scheduling
    preferredDate: Date,
    scheduledDate: Date,
    completedDate: Date,

    // Status
    status: {
      type: String,
      enum: ["pending", "scheduled", "in-progress", "completed", "cancelled"],
      default: "pending",
    },

    // Assignment
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    // Location
    serviceLocation: {
      address: String,
      coordinates: {
        lat: Number,
        lng: Number,
      },
      accessInstructions: String,
    },

    // Pricing
    estimatedCost: {
      type: Number,
      default: 0,
    },
    finalCost: {
      type: Number,
      default: 0,
    },

    // Service Details
    duration: {
      estimated: Number, // in hours
      actual: Number,
    },

    materials: [
      {
        name: String,
        quantity: Number,
        cost: Number,
      },
    ],

    // Communication
    notes: [
      {
        author: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        message: String,
        timestamp: {
          type: Date,
          default: Date.now,
        },
        isCustomerVisible: {
          type: Boolean,
          default: true,
        },
      },
    ],

    // Attachments
    attachments: [
      {
        filename: String,
        url: String,
        type: {
          type: String,
          enum: ["image", "document", "video"],
        },
        uploadedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        uploadedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    // Quality Assurance
    qualityCheck: {
      completed: {
        type: Boolean,
        default: false,
      },
      checkedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      checkDate: Date,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      feedback: String,
    },

    // Customer Satisfaction
    customerFeedback: {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      submittedAt: Date,
    },

    // Recurring Service
    isRecurring: {
      type: Boolean,
      default: false,
    },
    recurringSchedule: {
      frequency: {
        type: String,
        enum: ["weekly", "bi-weekly", "monthly", "quarterly"],
      },
      nextServiceDate: Date,
      endDate: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Generate request number before saving
maintenanceRequestSchema.pre("save", async function (next) {
  if (!this.requestNumber) {
    const count = await mongoose.model("MaintenanceRequest").countDocuments();
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    this.requestNumber = `MR${year}${month}${(count + 1)
      .toString()
      .padStart(4, "0")}`;
  }
  next();
});

// Methods
maintenanceRequestSchema.methods.updateStatus = function (
  newStatus,
  updatedBy
) {
  this.status = newStatus;
  this.notes.push({
    author: updatedBy,
    message: `Status updated to ${newStatus}`,
    timestamp: new Date(),
  });
  return this.save();
};

maintenanceRequestSchema.methods.addNote = function (
  message,
  author,
  isCustomerVisible = true
) {
  this.notes.push({
    author,
    message,
    timestamp: new Date(),
    isCustomerVisible,
  });
  return this.save();
};

module.exports = mongoose.model("MaintenanceRequest", maintenanceRequestSchema);
