import { useState } from "react";
import { FaMicrophone, FaUpload, FaLink } from "react-icons/fa";

const tabs = [
  { id: "record", label: "ضبط صدا", icon: <FaMicrophone />, color: "#00BA9F" },
  {
    id: "upload",
    label: "بارگذاری فایل",
    icon: <FaUpload />,
    color: "#118AD3",
  },
  { id: "link", label: "لینک", icon: <FaLink />, color: "#FF1654" },
];

function Uploader() {
  const [activeTab, setActiveTab] = useState("upload");

  return (
    <div className="relative mt-20 w-full max-w-3xl space-y-4" dir="rtl">
      {/* Tabs - OUTSIDE the upload box, on the top-right */}
      <div className="-mb-2 flex justify-start">
        <div className="flex flex-row gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all ${activeTab === tab.id ? "text-white shadow" : "text-custom-gray hover:text-primary"} `}
              style={{
                backgroundColor:
                  activeTab === tab.id ? tab.color : "transparent",
                borderRadius: activeTab === tab.id ? "10px 10px 0 0" : "0",
                border: "none", // <-- Removed border
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Upload Box */}
      <div
        className="relative w-full rounded-3xl border bg-gray-50 p-6 shadow-md"
        style={{
          borderRadius:
            activeTab === "record" ? "1.5rem 0 1.5rem 1.5rem" : "1.5rem",
        }}
      >
        {/* Tab Content */}
        <div className="text-custom-gray flex flex-col items-center justify-center space-y-4 py-10 text-center">
          {activeTab === "record" && (
            <>
              <FaMicrophone className="text-primary text-4xl" />
              برای ضبط صدا دکمه را فشار دهید
            </>
          )}
          {activeTab === "upload" && (
            <>
              <FaUpload className="text-primary text-4xl" />
              برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
            </>
          )}
          {activeTab === "link" && (
            <>
              <FaLink className="text-primary text-4xl" />
              برای افزودن لینک، دکمه را فشار دهید
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Uploader;
