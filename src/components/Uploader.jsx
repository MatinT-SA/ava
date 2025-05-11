import { useState } from "react";
import { FaMicrophone, FaUpload, FaLink } from "react-icons/fa";

const tabs = [
  { id: "record", label: "ضبط صدا", icon: <FaMicrophone /> },
  { id: "upload", label: "بارگذاری فایل", icon: <FaUpload /> },
  { id: "link", label: "لینک", icon: <FaLink /> },
];

function Uploader() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="relative mt-20 w-full max-w-3xl space-y-4">
      {/* Main Content (Upload Box) */}
      <div className="relative w-full rounded-3xl border bg-gray-50 p-6 shadow-md">
        {/* Tabs - Top Right */}
        <div className="absolute -top-6 right-6 flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${activeTab === tab.id ? "bg-red-200 text-white shadow" : ""} ${activeTab !== tab.id ? "text-custom-gray hover:text-primary border bg-transparent" : ""} `}
              style={{ minWidth: "100px" }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
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
