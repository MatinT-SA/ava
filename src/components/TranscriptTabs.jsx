// import { useState } from "react";
// import ClockIcon from "../../../assets/icons/ClockIcon";
// import TextIcon from "../../../assets/icons/TextIcon";

// function TranscriptTabs({ activeTab, setActiveTab }) {
//   return (
//     <div className="flex items-center justify-end gap-6 px-4 text-sm font-medium">
//       <button
//         onClick={() => setActiveTab("simple")}
//         className={`flex items-center gap-2 border-b-2 pb-1 ${
//           activeTab === "simple"
//             ? "border-custom-teal text-black"
//             : "border-transparent text-gray-500"
//         }`}
//       >
//         <TextIcon className="h-4 w-4" />
//         متن ساده
//       </button>
//       <button
//         onClick={() => setActiveTab("timed")}
//         className={`flex items-center gap-2 border-b-2 pb-1 ${
//           activeTab === "timed"
//             ? "border-custom-teal text-black"
//             : "border-transparent text-gray-500"
//         }`}
//       >
//         <ClockIcon className="h-4 w-4" />
//         متن زمان‌بندی شده
//       </button>
//     </div>
//   );
// }
