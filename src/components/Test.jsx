import React, { useState, useEffect } from "react";
import Toast from "./Toast";

const Test = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

  const triggerToast = (message, type = "info") => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000); // Auto-dismiss after 3 seconds
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold mb-4">React Toast Example</h1>
        <button
          onClick={() => triggerToast("Operation successful!", "success")}
          className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        >
          Show Success Toast
        </button>
        <button
          onClick={() => triggerToast("Account Deleted Successfully", "error")}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Show Error Toast
        </button>
      </div>
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

export default Test;
