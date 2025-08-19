// Date formatting utilities
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// String utilities
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};

export const slugify = (text) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Number formatting utilities
export const formatCurrency = (amount, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat("en-US").format(num);
};

// Validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
  return phoneRegex.test(phone);
};

export const validatePassword = (password) => {
  // At least 6 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/;
  return passwordRegex.test(password);
};

// Array utilities
export const groupBy = (array, key) => {
  return array.reduce((groups, item) => {
    const group = item[key];
    groups[group] = groups[group] || [];
    groups[group].push(item);
    return groups;
  }, {});
};

export const sortBy = (array, key, direction = "asc") => {
  return [...array].sort((a, b) => {
    const aVal = key.split(".").reduce((obj, k) => obj?.[k], a);
    const bVal = key.split(".").reduce((obj, k) => obj?.[k], b);

    if (direction === "asc") {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });
};

// Local storage utilities
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting from localStorage:", error);
      return null;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting to localStorage:", error);
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing from localStorage:", error);
    }
  },

  clear: () => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
  },
};

// URL utilities
export const buildUrl = (baseUrl, params = {}) => {
  const url = new URL(baseUrl);
  Object.keys(params).forEach((key) => {
    if (
      params[key] !== null &&
      params[key] !== undefined &&
      params[key] !== ""
    ) {
      url.searchParams.set(key, params[key]);
    }
  });
  return url.toString();
};

export const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  const result = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};

// Image utilities
export const getImageUrl = (
  imagePath,
  fallback = "/images/placeholder.jpg"
) => {
  if (!imagePath) return fallback;
  if (imagePath.startsWith("http")) return imagePath;
  return `${import.meta.env.VITE_API_URL}${imagePath}`;
};

// Debounce utility
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility
export const throttle = (func, limit) => {
  let inThrottle;
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Environment helpers
export const isDevelopment = () => import.meta.env.MODE === "development";
export const isProduction = () => import.meta.env.MODE === "production";

// Error handling
export const getErrorMessage = (error) => {
  if (typeof error === "string") return error;
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.message) return error.message;
  return "An unexpected error occurred";
};

// Form utilities
export const createFormData = (data) => {
  const formData = new FormData();

  Object.keys(data).forEach((key) => {
    const value = data[key];

    if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((item) => formData.append(`${key}[]`, item));
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value);
    }
  });

  return formData;
};

// Color utilities
export const generateColorFromString = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  return `hsl(${hue}, 70%, 50%)`;
};

// Constants
export const SERVICE_CATEGORIES = {
  "design-consultation": "Design & Consultation",
  installation: "Installation Services",
  maintenance: "Maintenance & Care",
  restoration: "Restoration Services",
  consultation: "Expert Consultation",
  education: "Education & Workshops",
};

export const PROJECT_CATEGORIES = {
  "residential-landscaping": "Residential Landscaping",
  "commercial-landscaping": "Commercial Landscaping",
  "sustainable-gardens": "Sustainable Gardens",
  "water-conservation": "Water Conservation",
  "native-plant-restoration": "Native Plant Restoration",
  "green-roofs": "Green Roofs",
  "rain-gardens": "Rain Gardens",
  xeriscaping: "Xeriscaping",
  "organic-gardening": "Organic Gardening",
  permaculture: "Permaculture",
};

export const BOOKING_STATUS = {
  pending: "Pending Review",
  confirmed: "Confirmed",
  "in-progress": "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

export const PROPERTY_TYPES = {
  residential: "Residential",
  commercial: "Commercial",
  municipal: "Municipal",
};
