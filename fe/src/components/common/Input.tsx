import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
  as?: "input" | "select";
  children?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  as = "input",
  className = "",
  children,
  ...props
}) => {
  const inputClasses =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50";

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        {as === "select" ? (
          <select
            className={`${inputClasses} ${icon ? "pl-10" : ""} ${className}`}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {children}
          </select>
        ) : (
          <input
            className={`${inputClasses} ${icon ? "pl-10" : ""} ${className}`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    </div>
  );
};
