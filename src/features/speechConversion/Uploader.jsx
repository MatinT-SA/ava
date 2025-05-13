import { useState } from "react";
import UploadIcon from "../../assets/icons/UploadIcon";
import MicIcon from "../../assets/icons/MicIcon";
import Input from "../../components/Input";
import Goftar from "./Goftar";
import LinkIcon from "../../assets/icons/LinkIcon";

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
  const [activeTab, setActiveTab] = useState("record");
  const activeColor = tabs.find((tab) => tab.id === activeTab)?.color;

  return (
    <div
      className="xs:h-[200px] xs:w-[300px] relative mt-10 max-w-3xl pb-6 sm:h-[350px] sm:w-[480px] md:h-[429px] md:w-[653px] xl:h-[429px] xl:w-[653px] 2xl:h-[789px] 2xl:w-[1200px]"
      dir="rtl"
    >
      {/* Tabs + Goftar */}
      <div className="flex items-center justify-between">
        <div className="flex flex-row gap-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex cursor-pointer items-center justify-center gap-2 px-6 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? "text-white shadow"
                    : "text-custom-gray hover:text-primary"
                }`}
                style={{
                  backgroundColor: isActive ? tab.color : "transparent",
                  borderRadius: isActive ? "10px 10px 0 0" : "0",
                  border: "none",
                }}
              >
                <span
                  className={`${isActive ? "text-white" : "text-custom-gray"}`}
                >
                  {tab.icon}
                </span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Box */}
      <div
        className="xs:h-[200px] xs:w-[300px] relative sm:h-[350px] sm:w-[480px] md:h-[429px] md:w-[653px] xl:h-[429px] xl:w-[653px] 2xl:h-[789px] 2xl:w-[1200px]"
        dir="rtl"
        style={{
          borderRadius: activeTab === "record" ? "25px 0 25px 25px" : "25px",
          borderColor: activeColor,
          borderWidth: "1px",
          borderStyle: "solid",
        }}
      >
        <div className="text-custom-gray flex h-full flex-col items-center justify-center space-y-4 self-center py-10 text-center">
          {activeTab === "record" && (
            <>
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#00B3A1]">
                <MicIcon className="text-4xl text-white" />
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
                <UploadIcon className="text-4xl text-white" />
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

      {/* Goftar */}
      <div>
        <Goftar />
      </div>
    </div>
  );
}

export default Uploader;
