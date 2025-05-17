import { formatDuration } from "../../../utils/formatDuration";

export default function SegmentsViewer({ segments }) {
  if (!segments || segments.length === 0)
    return <p className="text-gray-500">یافت نشد</p>;

  return (
    <div>
      {segments.map((seg, index) => (
        <div
          key={index}
          className={`ml-4 rounded-[15px] px-10 py-3 text-black ${
            index % 2 === 0 ? "bg-gray-segments" : "bg-white"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <p className="min-w-[120px] font-semibold whitespace-nowrap text-black">
              {formatDuration(seg.start)} — {formatDuration(seg.end)}
            </p>
            <p className="flex-1">{seg.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
