const express = require("express");
const { body, validationResult } = require("express-validator");
const nodemailer = require("nodemailer");

const router = express.Router();

// Configure email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Contact form submission
router.post(
  "/",
  [
    body("name")
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email address"),
    body("phone")
      .optional()
      .trim()
      .isMobilePhone()
      .withMessage("Please enter a valid phone number"),
    body("subject")
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage("Subject must be between 5 and 100 characters"),
    body("message")
      .trim()
      .isLength({ min: 20, max: 1000 })
      .withMessage("Message must be between 20 and 1000 characters"),
    body("serviceInterest")
      .optional()
      .isString()
      .withMessage("Service interest must be a string"),
    body("preferredContact")
      .optional()
      .isIn(["email", "phone"])
      .withMessage("Invalid preferred contact method"),
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
        subject,
        message,
        serviceInterest,
        preferredContact = "email",
      } = req.body;

      // Create email content
      const emailContent = `
      <h2>New Contact Form Submission - EcoScape Hub</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
      <p><strong>Subject:</strong> ${subject}</p>
      ${
        serviceInterest
          ? `<p><strong>Service Interest:</strong> ${serviceInterest}</p>`
          : ""
      }
      <p><strong>Preferred Contact:</strong> ${preferredContact}</p>
      <hr>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
      <hr>
      <p><small>Submitted on: ${new Date().toLocaleString()}</small></p>
    `;

      // Auto-reply email content
      const autoReplyContent = `
      <h2>Thank you for contacting EcoScape Hub!</h2>
      <p>Dear ${name},</p>
      <p>We've received your message and appreciate your interest in our sustainable landscaping services. Our team will review your inquiry and get back to you within 24-48 hours.</p>
      
      <h3>Your Message Summary:</h3>
      <p><strong>Subject:</strong> ${subject}</p>
      ${
        serviceInterest
          ? `<p><strong>Service Interest:</strong> ${serviceInterest}</p>`
          : ""
      }
      <p><strong>Preferred Contact Method:</strong> ${preferredContact}</p>
      
      <p>In the meantime, feel free to explore our <a href="${
        process.env.FRONTEND_URL
      }/projects">portfolio of projects</a> and learn more about our <a href="${
        process.env.FRONTEND_URL
      }/services">sustainable services</a>.</p>
      
      <p>Best regards,<br>
      The EcoScape Hub Team</p>
      
      <hr>
      <p><small>This is an automated response. Please do not reply to this email.</small></p>
    `;

      try {
        const transporter = createTransporter();

        // Send email to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER, // Send to same email (you can change this)
          subject: `New Contact Form: ${subject}`,
          html: emailContent,
        });

        // Send auto-reply to user
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Thank you for contacting EcoScape Hub",
          html: autoReplyContent,
        });

        res.json({
          success: true,
          message:
            "Your message has been sent successfully! We'll get back to you soon.",
        });
      } catch (emailError) {
        console.error("Email sending error:", emailError);

        // Still return success to user, but log the error
        res.json({
          success: true,
          message:
            "Your message has been received. We'll get back to you soon.",
          note: "Email notification may be delayed",
        });
      }
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to send message. Please try again later.",
        error: error.message,
      });
    }
  }
);

// Get contact information
router.get("/info", (req, res) => {
  res.json({
    success: true,
    data: {
      businessHours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 4:00 PM",
        sunday: "Closed",
      },
      contactMethods: [
        {
          type: "email",
          value: "info@ecoscape-hub.com",
          label: "General Inquiries",
        },
        {
          type: "phone",
          value: "+1 (555) 123-4567",
          label: "Call Us",
        },
        {
          type: "emergency",
          value: "+1 (555) 123-4568",
          label: "Emergency Services",
        },
      ],
      officeLocation: {
        address: "123 Green Valley Road",
        city: "Eco City",
        state: "CA",
        zipCode: "90210",
        country: "USA",
      },
      serviceAreas: [
        "Los Angeles County",
        "Orange County",
        "Ventura County",
        "Riverside County",
      ],
      socialMedia: {
        facebook: "https://facebook.com/ecoscapehub",
        instagram: "https://instagram.com/ecoscapehub",
        twitter: "https://twitter.com/ecoscapehub",
        linkedin: "https://linkedin.com/company/ecoscapehub",
      },
    },
  });
});

// Subscribe to newsletter
router.post(
  "/newsletter",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please enter a valid email address"),
    body("name")
      .optional()
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters"),
    body("interests")
      .optional()
      .isArray()
      .withMessage("Interests must be an array"),
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

      const { email, name, interests = [] } = req.body;

      // Here you would typically save to a newsletter subscription database
      // For now, we'll just send a confirmation email

      const confirmationContent = `
      <h2>Welcome to EcoScape Hub Newsletter!</h2>
      <p>Dear ${name || "Valued Subscriber"},</p>
      <p>Thank you for subscribing to our newsletter! You'll now receive:</p>
      <ul>
        <li>🌱 Latest sustainable landscaping tips</li>
        <li>🏡 Project showcases and success stories</li>
        <li>🌿 Seasonal gardening advice</li>
        <li>💚 Environmental conservation updates</li>
        <li>🎯 Exclusive offers and early access to services</li>
      </ul>
      
      ${
        interests.length > 0
          ? `<p><strong>Your interests:</strong> ${interests.join(", ")}</p>`
          : ""
      }
      
      <p>You can unsubscribe at any time by clicking the link in any of our emails.</p>
      
      <p>Welcome to the EcoScape Hub community!</p>
      
      <p>Best regards,<br>
      The EcoScape Hub Team</p>
    `;

      try {
        const transporter = createTransporter();

        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Welcome to EcoScape Hub Newsletter!",
          html: confirmationContent,
        });
      } catch (emailError) {
        console.error("Newsletter email error:", emailError);
      }

      res.json({
        success: true,
        message:
          "Successfully subscribed to newsletter! Check your email for confirmation.",
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to subscribe to newsletter. Please try again later.",
        error: error.message,
      });
    }
  }
);

module.exports = router;
