import Sidebar from "./Sidebar";
import Header from "./Header";

function AppLayout({ children }) {
  return (
    <div className="flex h-screen bg-white">
      <div className="w-44 shrink-0 rounded-tl-2xl rounded-bl-2xl border-l border-gray-200 p-4">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}

export default AppLayout;
