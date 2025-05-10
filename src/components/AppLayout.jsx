import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AppLayout({ children }) {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <Sidebar />

      <div className="overflow-scroll">
        <main className="mx-auto max-w-3xl 2xl:max-w-6xl">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
