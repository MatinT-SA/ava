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
      <table className="w-full border-separate border-spacing-y-2 text-right">
        <thead>
          <tr className="rounded-md text-sm text-gray-600">
            <th className="px-4 py-2 text-right">نام فایل</th>
            <th className="px-4 py-2 text-right">تاریخ بارگذاری</th>
            <th className="px-4 py-2 text-right">نوع فایل</th>
            <th className="px-4 py-2 text-right">مدت زمان</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <ArchiveRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
