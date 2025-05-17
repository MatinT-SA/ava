import { useState } from "react";
import LinkIcon from "../../../assets/icons/LinkIcon";
import MicIcon from "../../../assets/icons/MicIcon";
import UploadIcon from "../../../assets/icons/UploadIcon";

import DeleteIcon from "../../../assets/icons/DeleteIcon";
import CopyIcon from "../../../assets/icons/CopyIcon";
import WordIcon from "../../../assets/icons/WordIcon";
import TextIcon from "../../../assets/icons/TextIcon";
import TimeIcon from "../../../assets/icons/TimeIcon";
import DownloadIconWithTooltip from "../../../components/DownloadIconWithTooltip/DownloadIconWithTooltip";

// import TimecodedTranscript from "../../../components/TimecodedTranscipt";
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

// فرض بر این است که fetchTranscriptById توی جایی import شده یا باید تعریف کنی

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
  console.log(item);
  const [segments, setSegments] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const guessedType = guessSourceTypeFromUrl(item.url);
  const { icon, color, borderColor } = getSourceTypeMeta(
    item.type || guessedType,
  );

  const [activeTab, setActiveTab] = useState("simple");

  const [transcriptSimple, setTranscriptSimple] = useState(null);
  const [transcriptTimed, setTranscriptTimed] = useState(null);
  const [isLoadingTranscript, setIsLoadingTranscript] = useState(false);
  const [transcriptError, setTranscriptError] = useState(null);

  const fileType = "." + (item.filename?.split(".").pop().toLowerCase() || "");

  async function handleToggleExpand() {
    if (!isExpanded) {
      if (transcriptSimple === null && transcriptTimed === null) {
        setIsLoadingTranscript(true);
        setTranscriptError(null);
        try {
          console.log("[handleToggleExpand] Fetching transcript...");
          const data = await fetchArchiveItemDetails(item.id);
          setTranscriptSimple(data.transcriptSimple);
          setTranscriptTimed(data.transcriptTimed);
          setSegments(data.segments); // 👈 این خط اضافه بشه
        } catch (err) {
          console.error("[handleToggleExpand] Error fetching transcript:", err);
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
    } catch (err) {
      console.error("خطا در حذف آیتم:", err);
    }
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (isNaN(date)) return dateStr;
    return date.toLocaleDateString("fa-IR");
  }

  return (
    <>
      <tr
        className="border text-center text-black"
        style={
          isExpanded
            ? {
                border: `1px solid ${borderColor}`,
                borderBottom: "none",
                borderRadius: "10px",
              }
            : {}
        }
      >
        <td className="px-2 py-3">
          <span className={`text-lg ${color}`}>{icon}</span>
        </td>
        <td className="max-w-sm px-4 py-2 text-right break-words">
          <span>{removingExtension(item.filename)}</span>
        </td>
        <td className="px-4 py-2 text-xs">{formatDate(item.processed)}</td>
        <td className="px-4 py-2 text-xs" style={{ direction: "ltr" }}>
          {fileType}
        </td>
        <td className="px-4 py-2 text-xs">{formatDuration(item.duration)}</td>

        <td className="py-2 pl-2">
          <div className="flex items-center justify-center gap-3">
            <button aria-label="دانلود فایل" className="hover:text-[#00BA9F]">
              <DownloadIconWithTooltip
                file={{ sizeInBytes: item.sizeInBytes }}
                className="h-5 w-5"
              />
            </button>
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
              title="کپی"
              onClick={() => copyTextToClipboard(transcriptSimple)}
              className="hover:text-[#00BA9F]"
              disabled={!transcriptSimple}
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
              <div className="rtl flex space-x-6 border-b">
                <button
                  onClick={() => setActiveTab("simple")}
                  className={`flex items-center gap-2 px-6 py-2 text-base transition-colors ${
                    activeTab === "simple"
                      ? "border-b-2 border-black font-bold text-black"
                      : "text-gray-600"
                  }`}
                >
                  <TextIcon />
                  متن ساده
                </button>
                <button
                  onClick={() => setActiveTab("timed")}
                  className={`flex items-center gap-2 px-6 py-2 text-base transition-colors ${
                    activeTab === "timed"
                      ? "border-b-2 border-black font-bold text-black"
                      : "text-gray-600"
                  }`}
                >
                  <TimeIcon />
                  متن زمان‌بندی شده
                </button>
              </div>

              <div
                style={{ maxHeight: "250px", overflowY: "auto" }}
                className="text-justify text-sm leading-7 whitespace-pre-wrap"
              >
                {isLoadingTranscript ? (
                  <p>در حال بارگذاری متن...</p>
                ) : transcriptError ? (
                  <p className="text-red-500">{transcriptError}</p>
                ) : activeTab === "simple" ? (
                  <pre>{transcriptSimple}</pre>
                ) : (
                  <SegmentsViewer segments={segments} />
                )}
              </div>

              {item.audioUrl && <CustomAudioPlayer src={item.audioUrl} />}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
