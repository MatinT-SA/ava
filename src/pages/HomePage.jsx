import React from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";

function HomePage() {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
    </div>
  );
}

export default HomePage;
