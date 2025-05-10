import React, { useState } from "react";
import Button from "../components/Button"; // این در اصل Dropdown شماست

function Main() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleLogout = () => {
    console.log("خروج انجام شد");
    setDropdownOpen(false);
  };

  return (
    <div className="relative flex-1 p-6 pr-64 font-sans">
      {/* Dropdown Button - طبق طرح فیگما */}
      <div className="absolute top-6 left-6 z-50">
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className={`flex items-center gap-2 rounded-full border border-[#2dd4bf] px-4 py-2 text-sm text-[#0f766e] transition hover:bg-[#f0fdfa] ${
              dropdownOpen ? "bg-[#f0fdfa]" : "bg-white"
            }`}
          >
            {/* آیکون کاربر */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="#0f766e"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            مهمان
            {/* آیکون فلش */}
            <svg
              className="mt-0.5 h-3 w-3"
              fill="none"
              stroke="#0f766e"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown List */}
          {dropdownOpen && (
            <div className="absolute left-0 mt-1 w-28 overflow-hidden rounded-md border border-gray-200 bg-white text-sm shadow-md">
              <button
                onClick={handleLogout}
                className="w-full border-b px-4 py-2 text-right hover:bg-gray-100"
              >
                خروج
              </button>
            </div>
          )}
        </div>
      </div>

      {/* محتوا */}
      <h1 className="mb-4 text-3xl font-bold">خوش آمدید به سایت ما!</h1>
      <p className="mb-6 text-lg">
        در اینجا می‌توانید به راحتی به آرشیو پست‌ها، مقالات، و محتوای قدیمی
        دسترسی داشته باشید.
      </p>

      <section>
        <h2 className="mb-3 text-2xl font-semibold">محتواهای موجود:</h2>
        <ul className="list-disc space-y-2 pr-5 text-base">
          <li>
            <span className="cursor-pointer text-blue-600 hover:underline">
              آرشیو ورزشی
            </span>
          </li>
          <li>
            <span className="cursor-pointer text-blue-600 hover:underline">
              آرشیو موسیقی
            </span>
          </li>
          <li>
            <span className="cursor-pointer text-blue-600 hover:underline">
              آرشیو تکنولوژی
            </span>
          </li>
        </ul>
      </section>
    </div>
  );
}

export default Main;
