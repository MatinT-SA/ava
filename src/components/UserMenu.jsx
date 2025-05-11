import { useState } from "react";
import UserIcon from "../assets/icons/UserIcon";
import LogoutIcon from "../assets/icons/LogoutIcon";
import ArrowIconDown from "../assets/icons/ArrowIconDown";
import ArrowIconUp from "../assets/icons/ArrowIconUp";
import Button from "./Button";

export default function UserMenu({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div className="relative z-50 text-right">
      <div
        className={`text-custom-teal flex flex-col items-stretch border-2 border-[#2dd4bf] bg-white text-sm text-[#0f766e] ${isOpen ? "bg-[#f0fdfa]" : ""}`}
        style={{
          borderRadius: isOpen ? "1.5rem" : "9999px",
          transition: "border-radius 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <Button
          onClick={toggleDropdown}
          className="flex items-center justify-start gap-2"
        >
          <UserIcon />
          مهمان
          {isOpen ? <ArrowIconUp /> : <ArrowIconDown isOpen={isOpen} />}
        </Button>

        {isOpen && (
          <>
            <div className="mx-2 border-t border-[#ccfbf1]" />
            <Button
              onClick={onLogout}
              className="flex items-center justify-start gap-2 hover:bg-gray-100"
            >
              <LogoutIcon />
              خروج
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
