// API Configuration
export const API_BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-domain.com/api"
    : "http://localhost:5000/api";

// Application Constants
export const APP_NAME = "EcoScape Hub";
export const APP_VERSION = "1.0.0";
export const APP_DESCRIPTION = "Sustainable Landscaping Solutions";

// UI Constants
export const ITEMS_PER_PAGE = 12;
export const ANIMATION_DURATION = 0.3;

// File Upload Constants
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];

// Service Categories
export const SERVICE_CATEGORIES = [
  { id: "landscaping", name: "Landscaping" },
  { id: "garden-design", name: "Garden Design" },
  { id: "irrigation", name: "Irrigation" },
  { id: "maintenance", name: "Maintenance" },
  { id: "consultation", name: "Consultation" },
];

// Project Categories
export const PROJECT_CATEGORIES = [
  { id: "residential", name: "Residential" },
  { id: "commercial", name: "Commercial" },
  { id: "public", name: "Public Spaces" },
  { id: "restoration", name: "Restoration" },
];

// Contact Information
export const CONTACT_INFO = {
  phone: "+1 (555) 123-4567",
  email: "info@ecoscapehub.com",
  address: "123 Green Valley Road, Portland, OR 97205",
  hours: {
    weekdays: "8:00 AM - 6:00 PM",
    saturday: "9:00 AM - 4:00 PM",
    sunday: "Closed",
  },
};

// Social Media Links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/ecoscapehub",
  twitter: "https://twitter.com/ecoscapehub",
  instagram: "https://instagram.com/ecoscapehub",
  linkedin: "https://linkedin.com/company/ecoscapehub",
};

// Route Paths
export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  SERVICES: "/services",
  PROJECTS: "/projects",
  CONTACT: "/contact",
  BLOG: "/blog",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: "ecoscape_auth_token",
  USER_DATA: "ecoscape_user_data",
  THEME: "ecoscape_theme",
};

// Theme Colors
export const THEME_COLORS = {
  primary: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e",
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },
  secondary: {
    50: "#eff6ff",
    100: "#dbeafe",
    200: "#bfdbfe",
    300: "#93c5fd",
    400: "#60a5fa",
    500: "#3b82f6",
    600: "#2563eb",
    700: "#1d4ed8",
    800: "#1e40af",
    900: "#1e3a8a",
  },
};
