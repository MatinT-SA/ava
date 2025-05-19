import { formatDuration } from "../../../utils/formatDuration";

export default function SegmentsViewer({ segments, activeSegmentIndex }) {
  if (!segments || segments.length === 0)
    return <p className="text-gray-500">یافت نشد</p>;

  return (
    <div>
      {segments.map((seg, index) => {
        const isActive = index === activeSegmentIndex;

        return (
          <div
            key={index}
            className={`ml-4 rounded-[15px] px-10 py-3 ${
              index % 2 === 0 ? "bg-gray-segments" : "bg-white"
            }`}
          >
            <div
              className="flex gap-4"
              style={{
                color: isActive ? "#2563EB" : "#000",
                fontWeight: isActive ? "bold" : "normal",
              }}
            >
              <p className="whitespace-nowrap">
                {formatDuration(seg.end)} &nbsp;&nbsp;&nbsp;{" "}
                {formatDuration(seg.start)}
              </p>
              <p>{seg.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
