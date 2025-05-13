import { useState } from "react";
import ArchiveRow from "./ArchiveRow";
import { fakeArchiveData } from "../data/fakeArchiveData";
import Pagination from "./Pagination";

export default function ArchiveTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(fakeArchiveData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = fakeArchiveData.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  return (
    <div className="overflow-x-auto rounded-xl bg-white px-12 py-6">
      <h1 className="text-custom-teal mb-6 text-2xl">آرشیو من</h1>

      {/* Scrollable Table with Always Visible Scroll Bar */}
      <div className="w-full overflow-x-auto sm:overflow-x-visible">
        <table className="w-full min-w-[700px] border-separate border-spacing-y-4 text-center">
          <thead>
            <tr className="rounded-md text-sm font-bold text-black">
              <th></th>
              <th className="px-8 pt-4 pb-5 text-right font-bold">نام فایل</th>
              <th className="px-4 font-bold">تاریخ بارگذاری</th>
              <th className="px-4 font-bold">نوع فایل</th>
              <th className="px-4 font-bold">مدت زمان</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
              <ArchiveRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
