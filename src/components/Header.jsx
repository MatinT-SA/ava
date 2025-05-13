import { FiMenu } from "react-icons/fi";
import UserMenu from "./UserMenu";

function Header({ toggleSidebar, isMobileView, isSidebarVisible }) {
  return (
    <header className="flex items-center justify-between bg-white px-4 pt-6 sm:px-10 lg:px-14">
      {isMobileView && !isSidebarVisible && (
        <button
          className="ml-auto p-2 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <FiMenu className="h-6 w-6 text-gray-700" />
        </button>
      )}

      <div className="mr-auto">
        <UserMenu onLogout={() => console.log("خروج کلیک شد")} />
      </div>
    </header>
  );
}

export default Header;
