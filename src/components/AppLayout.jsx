import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout({ children }) {
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

  return (
    <div className="flex h-screen bg-white">
      <Sidebar
        isOpen={isSidebarVisible}
        closeSidebar={toggleSidebar}
        isMobileView={isMobileView}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} isMobileView={isMobileView} />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
