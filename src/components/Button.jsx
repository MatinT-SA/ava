import { useState } from "react";
import UserIcon from "../assets/icons/UserIcon";
import ArrowDownIcon from "../assets/icons/ArrowDownIcon";

export default function UserMenu({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative z-50 text-right">
      <div
        className={`flex flex-col items-stretch rounded-full border border-[#2dd4bf] bg-white text-sm text-[#0f766e] transition-all ${
          isOpen ? "bg-[#f0fdfa]" : ""
        }`}
      >
        {/* Top Section: User button */}
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-between gap-2 rounded-full px-4 py-2"
        >
          <UserIcon />
          مهمان
          <ArrowDownIcon isOpen={isOpen} />
        </button>

        {/* Bottom Section: Logout (shown only if open) */}
        {isOpen && (
          <button
            onClick={onLogout}
            className="rounded-full border-t px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            خروج
          </button>
        )}
      </div>
    </div>
  );
}
