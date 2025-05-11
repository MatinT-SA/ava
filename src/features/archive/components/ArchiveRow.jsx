import LinkIcon from "../../../assets/icons/LinkIcon";
import MicIcon from "../../../assets/icons/MicIcon";
import UploadIcon from "../../../assets/icons/UploadIcon";

import DeleteIcon from "../../../assets/icons/DeleteIcon";
import CopyIcon from "../../../assets/icons/CopyIcon";
import WordIcon from "../../../assets/icons/WordIcon";
import DownloadIcon from "../../../assets/icons/DownloadIcon";

function getSourceTypeMeta(type) {
  switch (type) {
    case "upload":
      return {
        icon: (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#118AD3]">
            <UploadIcon className="h-4 w-4 text-white" />
          </div>
        ),
        color: "text-emerald-500",
        label: "آپلود",
      };
    case "link":
      return {
        icon: (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF1654]">
            <LinkIcon className="h-4 w-4 text-white" />
          </div>
        ),
        color: "text-cyan-600",
        label: "لینک",
      };
    case "record":
      return {
        icon: (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00B3A1]">
            <MicIcon className="h-4 w-4 text-white" />
          </div>
        ),
        color: "text-pink-500",
        label: "ضبط صدا",
      };
    default:
      return { icon: "❓", color: "text-gray-400", label: "نامشخص" };
  }
}

export default function ArchiveRow({ item }) {
  const { icon, color, label } = getSourceTypeMeta(item.sourceType);

  return (
    <tr className="border-b bg-white text-sm text-gray-700">
      <td className="flex items-center gap-2 px-4 py-2">
        <span className={`text-lg ${color}`}>{icon}</span>
        <div className="flex flex-col">
          <span className="font-medium">{item.fileName}</span>
          <span className={`text-xs ${color}`}>{label}</span>
        </div>
      </td>
      <td className="px-4 py-2">{item.uploadDate}</td>
      <td className="px-4 py-2">{item.fileType}</td>
      <td className="px-4 py-2">{item.duration}</td>

      {/* عملیات */}
      <td className="px-4 py-2">
        <div className="flex items-center justify-center gap-5 text-gray-500">
          <button title="مشاهده">
            <DownloadIcon className="h-5 w-5 hover:text-blue-600" />
          </button>
          <button title="ویرایش">
            <WordIcon className="h-5 w-5 hover:text-green-600" />
          </button>
          <button title="اشتراک‌گذاری">
            <CopyIcon className="h-5 w-5 hover:text-cyan-600" />
          </button>
          <button title="حذف">
            <DeleteIcon className="h-5 w-5 hover:text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
}
