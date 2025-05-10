import React from "react";

function Goftar() {
  return (
    <div className="flex items-center space-x-4 rtl:space-x-reverse">
      <span className="text-base">زبان گفتار</span>
      {/* Dropdown Language Selector */}
      <div className="relative">
        <button className="rounded-xl border px-4 py-2 text-sm font-medium">
          فارسی
        </button>
        {/* منوی کشویی */}
        {/* 
          <ul className="absolute top-full left-0 mt-1 w-full border bg-white rounded-md shadow-md">
            <li className="px-4 py-2 hover:bg-gray-100">فارسی</li>
            <li className="px-4 py-2 hover:bg-gray-100">انگلیسی</li>
          </ul> 
          */}
      </div>
    </div>
  );
}

export default Goftar;
