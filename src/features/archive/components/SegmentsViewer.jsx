// components/SegmentsViewer.jsx

export default function SegmentsViewer({ segments }) {
  if (!segments || segments.length === 0)
    return <p className="text-gray-500">سگمنتی وجود ندارد.</p>;

  return (
    <div className="space-y-2">
      {segments.map((seg, index) => (
        <div
          key={index}
          className="rounded-lg border bg-gray-50 p-3 text-sm text-gray-700"
        >
          <p className="mb-1 font-semibold text-[#00BA9F]">
            {seg.start} - {seg.end}
          </p>
          <p>{seg.text}</p>
        </div>
      ))}
    </div>
  );
}
