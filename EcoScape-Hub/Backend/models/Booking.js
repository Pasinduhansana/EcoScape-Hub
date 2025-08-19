const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    contactInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      preferredContact: {
        type: String,
        enum: ["email", "phone", "text"],
        default: "email",
      },
    },
    projectDetails: {
      location: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        coordinates: {
          lat: Number,
          lng: Number,
        },
      },
      propertyType: {
        type: String,
        enum: ["residential", "commercial", "municipal"],
        required: true,
      },
      area: {
        value: Number,
        unit: {
          type: String,
          enum: ["sq ft", "acres", "sq meters"],
          default: "sq ft",
        },
      },
      description: {
        type: String,
        required: true,
        maxLength: [1000, "Description cannot exceed 1000 characters"],
      },
      goals: [String],
      budget: {
        range: {
          type: String,
          enum: [
            "under-5k",
            "5k-15k",
            "15k-30k",
            "30k-50k",
            "over-50k",
            "custom",
          ],
        },
        custom: {
          min: Number,
          max: Number,
        },
      },
    },
    timeline: {
      preferredStart: Date,
      flexibility: {
        type: String,
        enum: ["flexible", "somewhat-flexible", "fixed"],
        default: "flexible",
      },
      urgency: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
      },
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "in-progress", "completed", "cancelled"],
      default: "pending",
    },
    consultation: {
      scheduled: Date,
      type: {
        type: String,
        enum: ["on-site", "virtual", "phone"],
      },
      notes: String,
    },
    pricing: {
      estimate: {
        amount: Number,
        breakdown: [
          {
            item: String,
            cost: Number,
            description: String,
          },
        ],
      },
      final: {
        amount: Number,
        approved: { type: Boolean, default: false },
        approvedDate: Date,
      },
    },
    communication: [
      {
        date: { type: Date, default: Date.now },
        type: {
          type: String,
          enum: ["email", "phone", "meeting", "site-visit"],
        },
        subject: String,
        notes: String,
        followUpRequired: Boolean,
      },
    ],
    attachments: [
      {
        name: String,
        url: String,
        type: String,
        uploadDate: { type: Date, default: Date.now },
      },
    ],
    rating: {
      score: {
        type: Number,
        min: 1,
        max: 5,
      },
      review: String,
      date: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
bookingSchema.index({ user: 1, createdAt: -1 });
bookingSchema.index({ service: 1, status: 1 });
bookingSchema.index({ status: 1, createdAt: -1 });
bookingSchema.index({ "consultation.scheduled": 1 });

module.exports = mongoose.model("Booking", bookingSchema);
