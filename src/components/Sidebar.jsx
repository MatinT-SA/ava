import React from "react";
import Logo from "./Logo";
import { FaMicrophoneAlt, FaArchive } from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar-bg fixed top-0 right-0 flex h-full w-64 flex-col gap-10 p-6 text-white">
      <div className="flex items-center justify-center gap-3">
        <Logo />
        <span className="text-2xl font-bold">آوا</span>
      </div>

      <nav className="mt-25 flex h-full flex-col items-center gap-4">
        <div className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-800">
          <FaMicrophoneAlt className="text-lg" />
          <span>تبدیل گفتار</span>
        </div>

        <div className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 hover:bg-gray-800">
          <FaArchive className="text-lg" />
          <span>آرشیو</span>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
