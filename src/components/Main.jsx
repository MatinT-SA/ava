import { useState } from "react";
import Button from "./Button";

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
          <Button>مهمان</Button>

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
