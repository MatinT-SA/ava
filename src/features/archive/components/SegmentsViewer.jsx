import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveSegmentIndex } from "../../../redux/segmentsSlice";
import { formatDuration } from "../../../utils/formatDuration";

export default function SegmentsViewer({ segments, currentTime }) {
  const dispatch = useDispatch();
  const activeSegmentIndex = useSelector(
    (state) => state.segments.activeSegmentIndex,
  );

  if (!segments || segments.length === 0)
    return <p className="text-gray-500">یافت نشد</p>;

  return (
    <div>
      {segments.map((seg, index) => {
        const isActive = index === activeSegmentIndex;

        return (
          <div
            key={index}
            onClick={() => dispatch(setActiveSegmentIndex(index))}
            className={`ml-4 cursor-pointer rounded-[15px] px-10 py-3 ${
              index % 2 === 0 ? "bg-gray-segments" : "bg-white"
            }`}
            style={{
              color: isActive ? "#2563EB" : "#000",
              fontWeight: isActive ? "bold" : "normal",
            }}
          >
            <div className="flex gap-4">
              <p className="whitespace-nowrap">
                {formatDuration(seg.start)} &nbsp;&nbsp;&nbsp;{" "}
                {formatDuration(seg.end)}
              </p>
              <p>{seg.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
