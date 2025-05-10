import React from "react";

function Uploader() {
  return (
    <div className="w-full max-w-md space-y-4">
      {/* تب‌ها */}
      <div className="flex justify-between border-b">
        <button className="hover:border-primary flex-1 border-b-2 border-transparent py-2 text-sm font-medium">
          ضبط
        </button>
        <button className="hover:border-primary flex-1 border-b-2 border-transparent py-2 text-sm font-medium">
          آپلود
        </button>
        <button className="hover:border-primary flex-1 border-b-2 border-transparent py-2 text-sm font-medium">
          لینک
        </button>
      </div>

      {/* محتوای uploader */}
      <div className="rounded-xl border bg-gray-50 p-4">
        {/* محتوای مرتبط با تب انتخاب‌شده در اینجا بارگذاری می‌شود */}
        {/* مثلاً فرم آپلود فایل صوتی */}
      </div>
    </div>
  );
}

export default Uploader;
