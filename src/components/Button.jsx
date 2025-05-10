import { useState } from "react";
import { FaUser } from "react-icons/fa";

export default function Button({ label = "مهمان", options = [], onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className="relative z-50 inline-block text-right">
      <button
        onClick={toggleDropdown}
        className={`flex items-center gap-2 rounded-full border border-[#2dd4bf] px-4 py-2 text-sm text-[#0f766e] transition ${
          isOpen ? "bg-[#f0fdfa]" : "bg-white"
        }`}
      >
        <FaUser className="h-4 w-4 text-[#0f766e]" />
        {label}
        <svg
          className="mt-0.5 h-3 w-3"
          fill="none"
          stroke="#0f766e"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-1 w-28 overflow-hidden rounded-md border border-gray-200 bg-white text-sm shadow-md">
          {options.length > 0 ? (
            options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option)}
                className="w-full border-b px-4 py-2 text-right hover:bg-gray-100"
              >
                {option.label}
              </button>
            ))
          ) : (
            <button
              onClick={() => handleOptionClick("logout")}
              className="w-full border-b px-4 py-2 text-right hover:bg-gray-100"
            >
              خروج
            </button>
          )}
        </div>
      )}
    </div>
  );
}
