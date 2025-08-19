const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      unique: true,
    },
    // Basic Information (flattened to match frontend)
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },

    // Address (nested structure maintained)
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        default: "USA",
      },
    },

    // Preferences (nested structure to match frontend)
    preferences: {
      serviceTypes: [
        {
          type: String,
          enum: [
            "Lawn Care",
            "Garden Design",
            "Tree Services",
            "Irrigation",
            "Landscaping",
            "Pest Control",
            "Seasonal Cleanup",
            "Hardscaping",
          ],
        },
      ],
      communicationMethod: {
        type: String,
        enum: ["email", "phone", "sms", "mail"],
        default: "email",
      },
      specialInstructions: String,
    },

    // Account Status
    status: {
      type: String,
      enum: ["active", "inactive", "pending"],
      default: "active",
    },

    // Referral System
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    referralSource: {
      type: String,
      enum: ["website", "social-media", "referral", "advertisement", "other"],
      default: "website",
    },
    totalReferrals: {
      type: Number,
      default: 0,
    },

    // Loyalty Program
    loyaltyPoints: {
      type: Number,
      default: 0,
    },
    loyaltyLevel: {
      type: String,
      enum: ["Bronze", "Silver", "Gold", "Platinum"],
      default: "Bronze",
    },
    loyaltyStatus: {
      type: String,
      enum: ["bronze", "silver", "gold", "platinum"],
      default: "bronze",
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    serviceCount: {
      type: Number,
      default: 0,
    },
    totalServicesCount: {
      type: Number,
      default: 0,
    },

    // Dates
    lastServiceDate: Date,
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Auto-generate unique registration number before saving
customerSchema.pre("save", async function (next) {
  if (!this.registrationNumber) {
    try {
      // Find the highest existing registration number
      const lastCustomer = await this.constructor
        .findOne({}, { registrationNumber: 1 })
        .sort({ registrationNumber: -1 })
        .lean();

      let nextNumber = 1;

      if (lastCustomer && lastCustomer.registrationNumber) {
        // Extract number from format "CUST000001"
        const lastNumber = parseInt(
          lastCustomer.registrationNumber.replace("CUST", "")
        );
        nextNumber = lastNumber + 1;
      }

      // Generate new registration number with leading zeros
      this.registrationNumber = `CUST${String(nextNumber).padStart(6, "0")}`;

      console.log(`Generated registration number: ${this.registrationNumber}`);
    } catch (error) {
      console.error("Error generating registration number:", error);
      // Fallback to timestamp-based number if there's an error
      this.registrationNumber = `CUST${Date.now().toString().slice(-6)}`;
    }
  }
  next();
});

// Update loyalty level and status based on total spent
customerSchema.pre("save", function (next) {
  if (this.totalSpent >= 10000) {
    this.loyaltyLevel = "Platinum";
    this.loyaltyStatus = "platinum";
  } else if (this.totalSpent >= 5000) {
    this.loyaltyLevel = "Gold";
    this.loyaltyStatus = "gold";
  } else if (this.totalSpent >= 2000) {
    this.loyaltyLevel = "Silver";
    this.loyaltyStatus = "silver";
  } else {
    this.loyaltyLevel = "Bronze";
    this.loyaltyStatus = "bronze";
  }

  // Sync service counts
  this.totalServicesCount = this.serviceCount;

  next();
});

// Virtual for full name (for backward compatibility)
customerSchema.virtual("fullName").get(function () {
  return this.name;
});

// Virtual for age
customerSchema.virtual("age").get(function () {
  if (this.dateOfBirth) {
    return Math.floor(
      (Date.now() - this.dateOfBirth.getTime()) / (365.25 * 24 * 60 * 60 * 1000)
    );
  }
  return null;
});

// Virtual for full address
customerSchema.virtual("fullAddress").get(function () {
  return `${this.address.street}, ${this.address.city}, ${this.address.state} ${this.address.zipCode}`;
});

module.exports = mongoose.model("Customer", customerSchema);
