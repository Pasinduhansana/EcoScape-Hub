import React from "react";
import { motion } from "framer-motion";

const LoadingSpinner = ({ size = "medium", color = "green" }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
    xlarge: "w-16 h-16",
  };

  const colorClasses = {
    green: "border-green-600",
    blue: "border-blue-600",
    white: "border-white",
    gray: "border-gray-600",
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default LoadingSpinner;
