import { useState } from "react";
import { toast } from "react-hot-toast";
import LinkIcon from "../../../assets/icons/LinkIcon";
import MicIcon from "../../../assets/icons/MicIcon";
import UploadIcon from "../../../assets/icons/UploadIcon";

import DeleteIcon from "../../../assets/icons/DeleteIcon";
import CopyIcon from "../../../assets/icons/CopyIcon";
import WordIcon from "../../../assets/icons/WordIcon";
import TextIcon from "../../../assets/icons/TextIcon";
import TimeIcon from "../../../assets/icons/TimeIcon";
import DownloadIconWithTooltip from "../../../components/DownloadIconWithTooltip/DownloadIconWithTooltip";

import CustomAudioPlayer from "../../../components/CustomAudioPlayer";
import SegmentsViewer from "./SegmentsViewer";

import {
  deleteArchiveItem,
  fetchArchiveItemDetails,
} from "../../../services/apiService";

import { copyTextToClipboard } from "../../../utils/copyTextToClipboard";
import { formatDuration } from "../../../utils/formatDuration";
import { guessSourceTypeFromUrl } from "../../../utils/guessSourceFileFromUrl";
import { removingExtension } from "../../../utils/removingExtension";
import { getFileExtension } from "../../../utils/getFileExtension";
import { formatDate } from "../../../utils/formatDate";

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
        borderColor: "var(--color-blue-upload)",
      };
    case "link":
      return {
        icon: (
          <div className="bg-red-link flex h-8 w-8 items-center justify-center rounded-full">
            <LinkIcon className="h-4 w-4 text-white" />
          </div>
        ),
        color: "text-cyan-600",
        borderColor: "var(--color-red-link)",
      };
    case "record":
      return {
        icon: (
          <div className="bg-green-archive-icons flex h-8 w-8 items-center justify-center rounded-full">
            <MicIcon className="h-4 w-4 text-white" />
          </div>
        ),
        color: "text-pink-500",
        borderColor: "var(--color-custom-teal)",
      };
    default:
      return { icon: "❓", color: "text-gray-400" };
  }
}

export default function ArchiveRow({ item, onDelete }) {
  const [activeTab, setActiveTab] = useState("simple");
  const [currentTime, setCurrentTime] = useState(0);
  const [segments, setSegments] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [transcriptSimple, setTranscriptSimple] = useState(null);
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
  const [transcriptError, setTranscriptError] = useState(null);

  const guessedType = guessSourceTypeFromUrl(item.url);
  const { icon, color, borderColor } = getSourceTypeMeta(
    item.type || guessedType,
  );

  async function handleToggleExpand() {
    if (!isExpanded) {
      if (transcriptSimple === null) {
        setIsLoadingTranscript(true);
        try {
          const data = await fetchArchiveItemDetails(item.id);
          setTranscriptSimple(
            data.segments.map((segment) => segment.text).join(" "),
          );
          setSegments(data.segments);
        } catch (err) {
          setTranscriptError("خطا در دریافت متن");
        } finally {
          setIsLoadingTranscript(false);
        }
      }
    }
    setIsExpanded((prev) => !prev);
  }

  async function handleDelete() {
    try {
      await deleteArchiveItem(item.id);
      onDelete(item.id);
      toast.success("آیتم با موفقیت حذف شد.");
    } catch (err) {
      console.error("خطا در حذف آیتم:", err);
      toast.error("خطا در حذف آیتم.");
    }
  }

  return (
    <>
      <tr className="text-center text-black">
        <td
          className={`px-2 py-3 ${isExpanded ? "border-t border-r" : ""}`}
          style={isExpanded ? { borderColor } : {}}
        >
          {isExpanded ? (
            <div className="overflow-hidden rounded-tl-[10px]">
              <span className={`text-lg ${color}`}>{icon}</span>
            </div>
          ) : (
            <span className={`text-lg ${color}`}>{icon}</span>
          )}
        </td>

        <td
          className={`max-w-sm px-4 py-2 text-right break-words ${isExpanded ? "border-t" : ""}`}
          style={isExpanded ? { borderColor } : {}}
        >
          <span>{removingExtension(item.filename)}</span>
        </td>

        <td
          className={`px-4 py-2 text-xs ${isExpanded ? "border-t" : ""}`}
          style={isExpanded ? { borderColor } : {}}
        >
          {formatDate(item.processed)}
        </td>

        <td
          className={`px-4 py-2 text-xs ${isExpanded ? "border-t" : ""}`}
          style={{
            direction: "ltr",
            ...(isExpanded ? { borderColor } : {}),
          }}
        >
          {getFileExtension(item.filename)}
        </td>

        <td
          className={`px-4 py-2 text-xs ${isExpanded ? "border-t" : ""}`}
          style={isExpanded ? { borderColor } : {}}
        >
          {formatDuration(item.duration)}
        </td>

        <td
          className={`py-2 pl-2 ${isExpanded ? "border-t border-l" : ""}`}
          style={isExpanded ? { borderColor } : {}}
        >
          {isExpanded ? (
            <div className="flex items-center justify-center gap-3 overflow-hidden rounded-tr-[10px]">
              <a
                aria-label="دانلود فایل"
                className="hover:text-[#00BA9F]"
                href={item.url}
              >
                <DownloadIconWithTooltip
                  file={{ sizeInBytes: item.sizeInBytes }}
                  className="h-5 w-5"
                />
              </a>
              <button
                aria-label="نمایش متن"
                title="نمایش متن"
                onClick={handleToggleExpand}
                className="hover:text-[#00BA9F]"
              >
                <WordIcon className="h-5 w-5" />
              </button>
              <button
                aria-label="کپی"
                onClick={() => copyTextToClipboard(transcriptSimple)}
                className={`hover:text-[#00BA9F] ${!isExpanded ? "cursor-not-allowed" : ""}`}
                disabled={!isExpanded}
              >
                <CopyIcon className="h-5 w-5" />
              </button>
              <button
                aria-label="حذف"
                title="حذف"
                onClick={handleDelete}
                className="group"
              >
                <div className="group-hover:bg-red-delete flex h-7 w-7 items-center justify-center rounded-full transition-colors">
                  <DeleteIcon className="text-custom-gray h-4 w-4 transition-colors group-hover:text-white" />
                </div>
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <a
                aria-label="دانلود فایل"
                className="hover:text-[#00BA9F]"
                href={item.url}
              >
                <DownloadIconWithTooltip
                  file={{ sizeInBytes: item.sizeInBytes }}
                  className="h-5 w-5"
                />
              </a>
              <button
                aria-label="نمایش متن"
                title="نمایش متن"
                onClick={handleToggleExpand}
                className="hover:text-[#00BA9F]"
              >
                <WordIcon className="h-5 w-5" />
              </button>
              <button
                aria-label="کپی"
                onClick={() => copyTextToClipboard(transcriptSimple)}
                className={`hover:text-[#00BA9F] ${!isExpanded ? "cursor-not-allowed" : ""}`}
                disabled={!isExpanded}
              >
                <CopyIcon className="h-5 w-5" />
              </button>
              <button
                aria-label="حذف"
                title="حذف"
                onClick={handleDelete}
                className="group"
              >
                <div className="group-hover:bg-red-delete flex h-7 w-7 items-center justify-center rounded-full transition-colors">
                  <DeleteIcon className="text-custom-gray h-4 w-4 transition-colors group-hover:text-white" />
                </div>
              </button>
            </div>
          )}
        </td>
      </tr>

      {isExpanded && (
        <tr>
          <td
            colSpan={7}
            className="rounded-b-[10px] border border-t-0 border-t-transparent p-6 text-right"
            style={{ borderColor }}
          >
            <div className="flex flex-col space-y-4">
              <div className="rtl flex space-x-6 border-b px-12">
                <button
                  onClick={() => setActiveTab("simple")}
                  className={`flex items-center gap-2 px-3 py-2 transition-colors ${
                    activeTab === "simple"
                      ? "border-b-2 border-black font-bold text-black"
                      : "text-black"
                  }`}
                >
                  <TextIcon />
                  متن ساده
                </button>

                <button
                  onClick={() => setActiveTab("timed")}
                  className={`flex items-center gap-2 px-6 py-2 transition-colors ${
                    activeTab === "timed"
                      ? "border-b-2 border-black font-bold text-black"
                      : "text-black"
                  }`}
                >
                  <TimeIcon />
                  متن زمان‌بندی شده
                </button>
              </div>

              <div
                style={{ maxHeight: "250px", overflowY: "auto" }}
                className="custom-scrollbar text-justify leading-8"
              >
                {isLoadingTranscript ? (
                  <p>در حال بارگذاری متن...</p>
                ) : transcriptError ? (
                  <p className="text-red-500">{transcriptError}</p>
                ) : activeTab === "simple" ? (
                  <p className="px-15 text-black">{transcriptSimple}</p>
                ) : (
                  <SegmentsViewer segments={segments} />
                )}
              </div>

              {item.url && (
                <CustomAudioPlayer
                  setCurrentTime={setCurrentTime}
                  currentTime={currentTime}
                  src={item.url}
                  onTimeUpdate={(time) => setCurrentTime(time)}
                />
              )}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
