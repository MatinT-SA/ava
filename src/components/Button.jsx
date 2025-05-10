import { useState } from "react";
import UserIcon from "../assets/icons/UserIcon";
import ArrowDownIcon from "../assets/icons/ArrowDownIcon";

export default function Button({ children, options = [], onSelect }) {
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
        <UserIcon />
        {children}
        <ArrowDownIcon isOpen={isOpen} />
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
