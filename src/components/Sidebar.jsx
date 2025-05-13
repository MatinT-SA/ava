import Logo from "./Logo";
import SpeechIcon from "../assets/icons/SpeechIcon";
import ArchiveIcon from "../assets/icons/ArchiveIcon";

function Sidebar() {
  return (
    <aside className="sidebar-bg rounde fixed top-0 right-0 flex h-full w-44 flex-col gap-10 rounded-tl-2xl rounded-bl-2xl p-2 text-white opacity-95">
      <div className="mt-12 flex items-center justify-center gap-3">
        <Logo />
        <span className="text-2xl font-bold">آوا</span>
      </div>

      <nav className="mt-25 flex h-full flex-col items-stretch gap-8">
        <div className="hover:bg-sidebar-item-hover flex cursor-pointer items-center justify-start gap-4 rounded-md py-2.5 pr-5">
          <SpeechIcon />
          <span>تبدیل گفتار</span>
        </div>

        <div className="hover:bg-sidebar-item-hover flex cursor-pointer items-center justify-start gap-8 rounded-md py-2.5 pr-5">
          <ArchiveIcon />
          <span>آرشیو</span>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
