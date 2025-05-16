import { useState } from "react";
import LinkIcon from "../../../assets/icons/LinkIcon";
import MicIcon from "../../../assets/icons/MicIcon";
import UploadIcon from "../../../assets/icons/UploadIcon";

import DeleteIcon from "../../../assets/icons/DeleteIcon";
import CopyIcon from "../../../assets/icons/CopyIcon";
import WordIcon from "../../../assets/icons/WordIcon";
import DownloadIconWithTooltip from "../../../components/DownloadIconWithTooltip/DownloadIconWithTooltip";

import TimecodedTranscript from "../../../components/TimecodedTranscipt";

function getSourceTypeMeta(type) {
  switch (type) {
    case "upload":
      return {
        icon: (
          <div className="bg-blue-upload flex h-8 w-8 items-center justify-center rounded-full">
            <UploadIcon className="h-4 w-4 text-white" />
          </div>
        ),
        color: "text-emerald-500",
      };
    case "link":
      return {
        icon: (
          <div className="bg-red-link flex h-8 w-8 items-center justify-center rounded-full">
            <LinkIcon className="h-4 w-4 text-white" />
          </div>
        ),
        color: "text-cyan-600",
      };
    case "record":
      return {
        icon: (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00B3A1]">
            <MicIcon className="h-4 w-4 text-white" />
          </div>
        ),
        color: "text-pink-500",
      };
    default:
      return { icon: "❓", color: "text-gray-400" };
  }
}

export default function ArchiveRow({ item }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { icon, color } = getSourceTypeMeta(item.sourceType);

  // فرض می‌گیریم item شامل این فیلدها هم هست:
  // item.transcriptSimple - متن ساده
  // item.transcriptTimed - متن زمان‌بندی شده (می‌تونی یه رشته یا آرایه باشه)
  // item.audioUrl - لینک صوت

  const [activeTab, setActiveTab] = useState("simple"); // simple یا timed

  return (
    <>
      <tr className="bg-white text-center text-black">
        <td>
          <span className={`text-lg ${color}`}>{icon}</span>
        </td>
        <td className="flex items-center px-8 py-2 text-base">
          <div className="flex flex-col">
            {item.sourceType === "link" ? (
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-blue-600 hover:underline"
              >
                {item.fileUrl}
              </a>
            ) : (
              <span>{item.fileName}</span>
            )}
          </div>
        </td>
        <td className="px-4 py-2 text-xs">{item.uploadDate}</td>
        <td className="px-4 py-2 text-xs" style={{ direction: "ltr" }}>
          {item.fileType}
        </td>
        <td className="px-4 py-2 text-xs">{item.duration}</td>
        <td className="py-2 pl-2">
          <div className="flex items-center gap-3">
            <button>
              <DownloadIconWithTooltip
                file={{ sizeInBytes: item.sizeInBytes }}
                className="h-4 w-4"
              />
            </button>
            <button onClick={() => setIsExpanded((prev) => !prev)}>
              <WordIcon className="h-4 w-4" />
            </button>
            <button>
              <CopyIcon className="h-4 w-4" />
            </button>
            <button className="group">
              <div className="group-hover:bg-red-delete flex h-7 w-7 items-center justify-center rounded-full transition-colors">
                <DeleteIcon className="text-custom-gray h-4 w-4 transition-colors group-hover:text-white" />
              </div>
            </button>
          </div>
        </td>
      </tr>

      {/* ردیف اکاردئون باز شونده */}
      {isExpanded && (
        <tr>
          <td colSpan={7} className="bg-[#f5fafa] p-6 text-right">
            <div className="flex flex-col space-y-4">
              {/* تب ها */}
              <div className="rtl flex space-x-4 border-b border-gray-300">
                <button
                  onClick={() => setActiveTab("simple")}
                  className={`px-4 py-2 ${
                    activeTab === "simple"
                      ? "border-b-2 border-[#00BA9F] font-bold text-[#00BA9F]"
                      : "text-gray-600"
                  }`}
                >
                  متن ساده
                </button>
                <button
                  onClick={() => setActiveTab("timed")}
                  className={`px-4 py-2 ${
                    activeTab === "timed"
                      ? "border-b-2 border-[#00BA9F] font-bold text-[#00BA9F]"
                      : "text-gray-600"
                  }`}
                >
                  متن زمان‌بندی شده
                </button>
              </div>

              {/* محتوا */}
              <div
                style={{ maxHeight: "250px", overflowY: "auto" }}
                className="text-justify text-sm leading-7"
              >
                {activeTab === "simple" ? (
                  <pre>{item.transcriptSimple}</pre>
                ) : (
                  <TimecodedTranscript data={item.transcriptTimed} />
                )}
              </div>

              {/* پلیر صوت */}
              {item.audioUrl && (
                <audio
                  controls
                  src={item.audioUrl}
                  className="mt-4 w-full"
                  preload="metadata"
                >
                  مرورگر شما از تگ صوتی پشتیبانی نمی‌کند.
                </audio>
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
