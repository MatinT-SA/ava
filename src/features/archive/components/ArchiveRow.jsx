import LinkIcon from "../../../assets/icons/LinkIcon";
import MicIcon from "../../../assets/icons/MicIcon";
import UploadIcon from "../../../assets/icons/UploadIcon";

import DeleteIcon from "../../../assets/icons/DeleteIcon";
import CopyIcon from "../../../assets/icons/CopyIcon";
import WordIcon from "../../../assets/icons/WordIcon";
import DownloadIconWithTooltip from "../../../components/DownloadIconWithTooltip/DownloadIconWithTooltip";

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
      };
    case "link":
      return {
        icon: (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF1654]">
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
  console.log(item);
  const { icon, color } = getSourceTypeMeta(item.sourceType);

  return (
    <tr className="bg-white text-gray-700">
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

      <td className="px-4 py-2">
        <div className="flex items-center justify-center gap-5">
          <button>
            <DownloadIconWithTooltip
              file={{ sizeInBytes: item.sizeInBytes }}
              className="h-4 w-4"
            />
          </button>
          <button>
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
  );
}
