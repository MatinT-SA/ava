import React from "react";
import Logo from "./Logo";
import { FaMicrophoneAlt, FaArchive } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="fixed right-0 top-0 h-full w-64 bg-gray-900 text-white p-6 flex flex-col gap-10">
      <div className="flex items-center gap-3">
        <Logo />
        <span className="text-2xl font-bold">آوا</span>
      </div>

      <nav className="flex flex-col gap-4">
        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
          <FaMicrophoneAlt className="text-lg" />
          <span>تبدیل گفتار</span>
        </div>

        <div className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer">
          <FaArchive className="text-lg" />
          <span>آرشیو</span>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
