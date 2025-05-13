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

      {/* نمایش سایدبار در اندازه‌های کوچکتر از 1024px */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-44 flex-col gap-10 rounded-tl-2xl rounded-bl-2xl p-2 text-white opacity-95 transition-transform ${
          isSidebarVisible ? "translate-x-0" : "translate-x-full"
        } lg:block lg:translate-x-0`}
      >
        <Sidebar closeSidebar={closeSidebar} isMobileView={isMobileView} />
      </div>

      <div
        className={`flex flex-1 flex-col overflow-hidden ${isSidebarVisible && isMobileView ? "fixed inset-0 z-40 bg-black opacity-30" : ""}`}
      >
        {/* ارسال وضعیت‌ها به Header برای مدیریت همبرگر و سایدبار */}
        <Header
          toggleSidebar={toggleSidebar}
          isMobileView={isMobileView}
          isSidebarVisible={isSidebarVisible}
        />
        <main
          className={`flex-1 overflow-y-auto ${
            isSidebarVisible && isMobileView ? "bg-opacity-50" : ""
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
