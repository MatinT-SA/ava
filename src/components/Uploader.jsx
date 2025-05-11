import { useState } from "react";
import UploadIcon from "../assets/icons/UploadIcon";
import MicIcon from "../assets/icons/MicIcon";
import Input from "./Input";
import Goftar from "./Goftar";
import LinkIcon from "../assets/icons/LinkIcon";

const tabs = [
  { id: "record", label: "ضبط صدا", icon: <MicIcon />, color: "#00BA9F" },
  {
    id: "upload",
    label: "بارگذاری فایل",
    icon: <UploadIcon />,
    color: "#118AD3",
  },
  { id: "link", label: "لینک", icon: <LinkIcon />, color: "#FF1654" },
];

function Uploader() {
  const [activeTab, setActiveTab] = useState("upload");
  const activeColor = tabs.find((tab) => tab.id === activeTab)?.color;

  return (
    <div className="relative mt-7 w-full max-w-3xl" dir="rtl">
      {/* Tabs + Goftar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? "text-white shadow"
                  : "text-custom-gray hover:text-primary"
              }`}
              style={{
                backgroundColor:
                  activeTab === tab.id ? tab.color : "transparent",
                borderRadius: activeTab === tab.id ? "10px 10px 0 0" : "0",
                border: "none",
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
        className="relative w-full rounded-3xl border bg-white p-6 shadow-md"
        style={{
          borderRadius:
            activeTab === "record" ? "1.5rem 0 1.5rem 1.5rem" : "1.5rem",
          borderColor: activeColor,
          borderWidth: "2px",
          borderStyle: "solid",
        }}
      >
        <div className="text-custom-gray flex flex-col items-center justify-center space-y-4 py-10 text-center">
          {activeTab === "record" && (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00B3A1]">
                <MicIcon className="text-primary text-4xl" />
              </div>
              <p>
                برای شروع به صحبت، دکمه را فشار دهید
                <br /> متن پیاده شده آن، در اینجا ظاهر شود
              </p>
            </>
          )}
          {activeTab === "upload" && (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#118AD3]">
                <UploadIcon className="text-primary text-4xl" />
              </div>
              <p>
                برای بارگذاری فایل گفتاری (صوتی/تصویری)، دکمه را فشار دهید
                <br /> متن پیاده شده آن، در اینجا ظاهر می شود
              </p>
            </>
          )}
          {activeTab === "link" && (
            <>
              <Input />
              <p>
                نشانی اینترنتی فایل حاوی گفتار (صوتی/تصویری) را وارد
                <br /> و دکمه را فشار دهید
              </p>
            </>
          )}
        </div>
      </div>

      <div className="ml-auto">
        <Goftar />
      </div>
    </div>
  );
}

export default Uploader;
