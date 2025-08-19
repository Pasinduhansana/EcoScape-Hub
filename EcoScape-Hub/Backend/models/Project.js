const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxLength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      maxLength: [1000, "Description cannot exceed 1000 characters"],
    },
    category: {
      type: String,
      required: true,
      enum: [
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
      ],
    },
    images: [
      {
        url: String,
        alt: String,
        caption: String,
      },
    ],
    beforeAfter: {
      before: [String],
      after: [String],
    },
    location: {
      city: String,
      state: String,
      country: { type: String, default: "USA" },
    },
    client: {
      name: String,
      type: {
        type: String,
        enum: ["residential", "commercial", "municipal", "non-profit"],
      },
    },
    projectDetails: {
      area: {
        value: Number,
        unit: {
          type: String,
          enum: ["sq ft", "acres", "sq meters"],
          default: "sq ft",
        },
      },
      duration: {
        value: Number,
        unit: {
          type: String,
          enum: ["days", "weeks", "months"],
          default: "weeks",
        },
      },
      budget: {
        min: Number,
        max: Number,
        currency: { type: String, default: "USD" },
      },
    },
    features: [String],
    sustainabilityImpact: {
      waterSaved: Number, // gallons per year
      carbonReduced: Number, // lbs CO2 per year
      nativePlantsUsed: Number,
      wildlifeHabitat: Boolean,
      stormwaterManagement: Boolean,
    },
    status: {
      type: String,
      enum: ["planning", "in-progress", "completed", "maintenance"],
      default: "planning",
    },
    startDate: Date,
    completionDate: Date,
    featured: {
      type: Boolean,
      default: false,
    },
    tags: [String],
    testimonial: {
      text: String,
      author: String,
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Index for search functionality
projectSchema.index({ title: "text", description: "text", tags: "text" });
projectSchema.index({ category: 1 });
projectSchema.index({ featured: -1, createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);
