import React, { useState, useRef, useEffect } from "react";
import { Check, X, ChevronDown } from "lucide-react";

interface Option {
  id: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  name: string;
  required?: boolean;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  value,
  onChange,
  label,
  name,
  required,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleToggleOption = (optionId: string) => {
    const newValue = value.includes(optionId)
      ? value.filter((id) => id !== optionId)
      : [...value, optionId];
    onChange(newValue);
  };

  const removeOption = (optionId: string) => {
    onChange(value.filter((id) => id !== optionId));
  };

  const selectedOptions = options.filter((option) => value.includes(option.id));
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative" ref={dropdownRef}>
        <div
          className={`min-h-[42px] max-h-[80px] overflow-y-auto p-2 border rounded-lg bg-white cursor-pointer transition-colors ${
            isOpen
              ? "border-blue-500 ring-2 ring-blue-200"
              : "border-gray-300 hover:border-blue-500"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {selectedOptions.length === 0 ? (
                <span className="text-gray-500">Select employees...</span>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedOptions.map((option) => (
                    <span
                      key={option.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-blue-50 text-blue-700"
                    >
                      {option.label}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeOption(option.id);
                        }}
                        className="ml-1 p-0.5 hover:bg-blue-100 rounded-full transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <ChevronDown
              size={20}
              className={`text-gray-400 transition-transform ${
                isOpen ? "transform rotate-180" : ""
              }`}
            />
          </div>
        </div>

        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-10 z-40"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="absolute z-50 w-[calc(100%-2px)] max-w-[400px] mt-1 bg-white border border-gray-200 rounded-lg shadow-lg"
              style={{
                maxHeight: "180px",
                top: dropdownRef.current
                  ? dropdownRef.current.getBoundingClientRect().bottom +
                    window.scrollY
                  : 0,
                left: dropdownRef.current
                  ? dropdownRef.current.getBoundingClientRect().left
                  : 0,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-1.5 border-b border-gray-100 sticky top-0 bg-white z-10">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="overflow-y-auto" style={{ maxHeight: "120px" }}>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center px-3 py-1.5 hover:bg-gray-50 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleOption(option.id);
                      }}
                    >
                      <div className="flex items-center flex-1">
                        <div
                          className={`
                          w-4 h-4 border rounded mr-2 flex items-center justify-center
                          ${
                            value.includes(option.id)
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }
                        `}
                        >
                          {value.includes(option.id) && (
                            <Check size={12} className="text-blue-600" />
                          )}
                        </div>
                        <span className="text-gray-700 text-sm">
                          {option.label}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500 text-center">
                    No employees found
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <input
        type="hidden"
        name={name}
        value={value.join(",")}
        required={required}
      />
    </div>
  );
};
