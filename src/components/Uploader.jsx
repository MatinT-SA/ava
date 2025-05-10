import { useState } from "react";
import { FaMicrophone, FaUpload, FaLink } from "react-icons/fa";
import Goftar from "./Goftar";

const tabs = [
  { id: "record", label: "ضبط", icon: <FaMicrophone /> },
  { id: "upload", label: "آپلود", icon: <FaUpload /> },
  { id: "link", label: "لینک", icon: <FaLink /> },
];

function Uploader() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="relative mt-20 w-full max-w-3xl space-y-4">
      {/* Tabs - Top Right */}
      <div className="flex justify-start">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-[#118AD3] text-white"
                : "text-custom-gray hover:text-primary bg-transparent"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content (Upload Box) */}
      <div className="w-full rounded-3xl border bg-gray-50 p-6 shadow-md">
        <div className="text-custom-gray flex flex-col items-center justify-center space-y-4 py-10 text-center">
          <FaUpload className="text-primary text-4xl" />
          <p className="text-base leading-relaxed">
            برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
            <br />
            متن پیاده شده آن، در اینجا ظاهر می‌شود
          </p>
        </div>
      </div>
    </div>
  );
}

export default Uploader;
