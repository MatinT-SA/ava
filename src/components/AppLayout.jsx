import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout({ children }) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarVisible(true); // همیشه سایدبار باید نمایش داده بشه
        setIsMobileView(false); // وقتی بزرگتر از 1024px هستیم، همبرگر باید پنهان بشه
      } else {
        setIsSidebarVisible(false);
        setIsMobileView(true); // برای نمایش همبرگر در اندازه‌های موبایل
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // اجرای اولیه هنگام بارگذاری

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false); // بستن سایدبار
  };

  return (
    <div className="flex h-screen bg-white">
      {/* اگر سایدبار باید نمایش داده بشه، از position fixed استفاده میکنیم */}
      {isSidebarVisible && <div onClick={closeSidebar}></div>}

      {/* نمایش سایدبار در اندازه‌های بزرگتر از 1024px */}
      <div
        className={`w-44 shrink-0 rounded-tl-2xl rounded-bl-2xl border-l border-gray-200 p-4 lg:block ${isSidebarVisible ? "block" : "hidden"}`}
      >
        <Sidebar closeSidebar={closeSidebar} isMobileView={isMobileView} />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* ارسال وضعیت‌ها به Header برای مدیریت همبرگر و سایدبار */}
        <Header
          toggleSidebar={toggleSidebar}
          isMobileView={isMobileView}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
