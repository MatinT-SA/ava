import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "../redux/uiSlice";

import { FiX } from "react-icons/fi";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import SpeechIcon from "../assets/icons/SpeechIcon";
import ArchiveIcon from "../assets/icons/ArchiveIcon";

function Sidebar() {
  const dispatch = useDispatch();
  const isMobileView = useSelector((state) => state.ui.isMobileView);

  return (
    <aside className="sidebar-bg fixed top-0 right-0 z-50 flex h-full w-44 flex-col gap-10 rounded-tl-2xl rounded-bl-2xl p-2 text-white opacity-95">
      {isMobileView && (
        <button
          onClick={() => dispatch(closeSidebar())}
          className="absolute top-4 right-4 p-2"
        >
          <FiX className="h-6 w-6 text-gray-700" />
        </button>
      )}

      <div className="mt-12 flex items-center justify-center gap-3">
        <Logo />
        <span className="text-2xl font-bold">آوا</span>
      </div>

      <nav className="mt-25 flex h-full flex-col items-stretch gap-8">
        <SidebarItem to="/" icon={SpeechIcon} label="تبدیل گفتار" />
        <SidebarItem to="/archive" icon={ArchiveIcon} label="آرشیو" />
      </nav>
    </aside>
  );
}

export default Sidebar;
