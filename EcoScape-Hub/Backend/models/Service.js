const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
      maxLength: [100, "Service name cannot exceed 100 characters"],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      short: {
        type: String,
        required: true,
        maxLength: [200, "Short description cannot exceed 200 characters"],
      },
      detailed: {
        type: String,
        required: true,
        maxLength: [2000, "Detailed description cannot exceed 2000 characters"],
      },
    },
    category: {
      type: String,
      required: true,
      enum: [
        "design-consultation",
        "installation",
        "maintenance",
        "restoration",
        "consultation",
        "education",
      ],
    },
    pricing: {
      type: {
        type: String,
        enum: ["fixed", "hourly", "per-sqft", "custom"],
        required: true,
      },
      amount: {
        min: Number,
        max: Number,
      },
      unit: String, // e.g., 'per hour', 'per sq ft', 'per project'
      currency: { type: String, default: "USD" },
    },
    duration: {
      estimated: {
        value: Number,
        unit: { type: String, enum: ["hours", "days", "weeks", "months"] },
      },
      factors: [String], // factors that affect duration
    },
    features: [String],
    process: [
      {
        step: Number,
        title: String,
        description: String,
        duration: String,
      },
    ],
    requirements: {
      siteAccess: [String],
      permits: [String],
      seasonality: {
        bestMonths: [String],
        restrictions: [String],
      },
    },
    sustainability: {
      ecoFriendly: Boolean,
      certifications: [String],
      environmentalBenefits: [String],
    },
    images: [
      {
        url: String,
        alt: String,
        caption: String,
      },
    ],
    availability: {
      regions: [String],
      bookingAdvance: {
        value: Number,
        unit: { type: String, enum: ["days", "weeks", "months"] },
      },
    },
    featured: {
      type: Boolean,
      default: false,
    },
    active: {
      type: Boolean,
      default: true,
    },
    metadata: {
      popularityScore: { type: Number, default: 0 },
      averageRating: { type: Number, default: 0 },
      totalBookings: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Generate slug from name
serviceSchema.pre("save", function (next) {
  if (this.isModified("name")) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");
  }
  next();
});

// Index for search and filtering
serviceSchema.index({
  name: "text",
  "description.short": "text",
  "description.detailed": "text",
});
serviceSchema.index({ category: 1 });
serviceSchema.index({ featured: -1, "metadata.popularityScore": -1 });
serviceSchema.index({ active: 1 });

module.exports = mongoose.model("Service", serviceSchema);
