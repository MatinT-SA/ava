import { useEffect, useState } from "react";

export default function TimecodedTranscript() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://challenge3.server.archive.voxolab.com/api/v1/transcript")
      .then((res) => {
        if (!res.ok) throw new Error("خطا در دریافت داده از سرور");
        return res.json();
      })
      .then((json) => setData(json))
      .catch((err) => {
        console.error("API error:", err);
        setError("اتصال برقرار شد اما پاسخی از سرور دریافت نشد.");
      });
  }, []);

  return (
    <div className="flex flex-col rounded-md border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex justify-between border-b border-gray-300 bg-gray-100 px-4 py-2 font-semibold">
        <span>متن زمان‌بندی شده</span>
      </div>

      {/* Body */}
      <div
        className="max-h-72 overflow-y-auto px-4 py-3 text-justify text-sm leading-7"
        style={{ direction: "rtl" }}
      >
        {error && <p className="text-center text-sm text-red-500">{error}</p>}

        {data.length > 0 ? (
          data.map((item, i) => (
            <div key={i} className="mb-2 rounded-md p-2 hover:bg-gray-100">
              <span className="ml-2 text-xs text-gray-500">
                {item.start} - {item.end}
              </span>
              <span>{item.text}</span>
            </div>
          ))
        ) : !error ? (
          <p className="text-center text-gray-400">در حال دریافت اطلاعات...</p>
        ) : null}
      </div>
    </div>
  );
}
