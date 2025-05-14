import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarVisible(true);
        setIsMobileView(false);
      } else {
        setIsSidebarVisible(false);
        setIsMobileView(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarVisible((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  return (
    <div className="flex h-screen bg-white">
      {isSidebarVisible && isMobileView && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-black opacity-30"
          onClick={closeSidebar}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-44 flex-col gap-10 rounded-tl-2xl rounded-bl-2xl p-2 text-white opacity-95 transition-transform ${
          isSidebarVisible && isMobileView
            ? "translate-x-0"
            : "translate-x-full"
        } lg:block lg:translate-x-0`}
      >
        <Sidebar closeSidebar={closeSidebar} isMobileView={isMobileView} />
      </div>

      <div
        className={`flex flex-1 flex-col overflow-hidden ${
          !isMobileView && "lg:mr-44"
        }`}
      >
        <Header
          toggleSidebar={toggleSidebar}
          isMobileView={isMobileView}
          isSidebarVisible={isSidebarVisible}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
