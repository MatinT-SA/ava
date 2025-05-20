import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleSidebar,
  closeSidebar,
  setIsMobileView,
  setIsSidebarVisible,
} from "../redux/uiSlice";

function AppLayout() {
  const dispatch = useDispatch();
  const isSidebarVisible = useSelector((state) => state.ui.isSidebarVisible);
  const isMobileView = useSelector((state) => state.ui.isMobileView);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        dispatch(setIsSidebarVisible(true));
        dispatch(setIsMobileView(false));
      } else {
        dispatch(setIsSidebarVisible(false));
        dispatch(setIsMobileView(true));
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-white">
      {isSidebarVisible && isMobileView && (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-black opacity-30"
          onClick={() => dispatch(closeSidebar())}
        ></div>
      )}

      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-44 flex-col gap-10 rounded-tl-2xl rounded-bl-2xl p-2 text-white opacity-95 transition-transform ${
          isSidebarVisible && isMobileView
            ? "translate-x-0"
            : "translate-x-full"
        } lg:block lg:translate-x-0`}
      >
        <Sidebar />
      </div>

      <div
        className={`flex flex-1 flex-col overflow-hidden ${
          !isMobileView && "lg:mr-44"
        }`}
      >
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
