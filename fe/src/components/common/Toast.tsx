import React, { useEffect, useState } from "react";
import { X, CheckCircle, AlertTriangle } from "lucide-react";

type ToastProps = {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
};

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow time for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColor =
    type === "success"
      ? "bg-green-50 border-green-200"
      : "bg-red-50 border-red-200";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";
  const iconColor = type === "success" ? "text-green-500" : "text-red-500";

  return (
    <div
      className={`fixed top-4 right-4 z-50 flex items-center p-4 mb-4 border rounded-lg shadow-md transition-all duration-300 ${bgColor} ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
      }`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
        {type === "success" ? (
          <CheckCircle className={`w-5 h-5 ${iconColor}`} />
        ) : (
          <AlertTriangle className={`w-5 h-5 ${iconColor}`} />
        )}
      </div>
      <div className={`ml-3 text-sm font-normal ${textColor}`}>{message}</div>
      <button
        type="button"
        className={`ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${textColor} hover:bg-gray-100`}
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
        aria-label="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
