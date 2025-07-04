import React from "react";

interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement> {
  label?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode; // Tambahkan prop ini
  as?: "input" | "select";
  children?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  rightIcon, // Tambahkan parameter ini
  as = "input",
  className = "",
  children,
  ...props
}) => {
  const inputClasses =
    "w-full rounded-md shadow-sm border py-2 px-3 focus:outline-none focus:ring-durian-500 focus:border-durian-500";

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

        {/* Tambahkan bagian rightIcon */}
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}

        {as === "select" ? (
          <select
            className={`${inputClasses} ${icon ? "pl-10" : ""} ${
              rightIcon ? "pr-10" : ""
            } ${className}`}
            {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)}
          >
            {children}
          </select>
        ) : (
          <input
            className={`${inputClasses} ${icon ? "pl-10" : ""} ${
              rightIcon ? "pr-10" : ""
            } ${className}`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    </div>
  );
};
