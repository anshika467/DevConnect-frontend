import React from "react";

const Toast = ({ message, type, isVisible, onClose }) => {
  const typeClasses = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <div
      className={`toast toast-top toast-center mt-6 -translate-x-1/2 rounded-lg shadow-lg p-4 text-white transform transition-all duration-700 ease-in-out
        ${typeClasses[type] || "bg-gray-700"}
        ${
          isVisible
            ? "opacity-100 translate-y-0 animate-bounce"
            : "opacity-0 -translate-y-6 pointer-events-none"
        }
      `}
      onClick={onClose}
    >
      <div className="flex items-center justify-center pointer-events-none">
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Toast;
