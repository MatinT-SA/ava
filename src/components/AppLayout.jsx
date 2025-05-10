import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout({ children }) {
  return (
    <div className="flex h-screen">
      <div className="w-48 shrink-0 rounded-tl-2xl rounded-bl-2xl border-l border-gray-200 bg-white p-4">
        <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}

export default AppLayout;
