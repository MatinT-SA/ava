// features/speechConversion/components/SpeechInput.jsx
import { useState } from "react";
import { FaFileAudio, FaLink, FaMicrophone } from "react-icons/fa";
import Goftar from "../../../components/Goftar"; // مسیر صحیح اگه بیرون از feature هست

const tabs = [
  { id: "mic", label: "ضبط صدا", icon: <FaMicrophone /> },
  { id: "file", label: "بارگذاری فایل", icon: <FaFileAudio /> },
  { id: "link", label: "لینک", icon: <FaLink /> },
];

function SpeechInput() {
  const [activeTab, setActiveTab] = useState("file");

  return (
    <div className="relative mx-auto w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg">
      {/* Tabs */}
      <div className="mb-6 flex justify-end gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm transition-all duration-200 ${
              activeTab === tab.id
                ? "bg-[#00BA9F] text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Upload Placeholder */}
      <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 py-16 text-center">
        <FaFileAudio className="mb-4 text-4xl text-gray-400" />
        <p className="leading-relaxed text-gray-500">
          برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
          <br />
          متن پیاده شده آن، در اینجا ظاهر می‌شود
        </p>
      </div>

      {/* Goftar */}
      <div className="absolute bottom-4 left-4">
        <Goftar />
      </div>
    </div>
  );
}

export default SpeechInput;
