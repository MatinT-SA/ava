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

      <table className="w-full border-separate border-spacing-y-4 text-right">
        <thead>
          <tr className="font-bol rounded-md text-sm text-black">
            <th></th>
            <th className="px-8 pt-4 pb-5 text-right font-bold">نام فایل</th>
            <th className="px-4 text-right font-bold">تاریخ بارگذاری</th>
            <th className="px-4 text-right font-bold">نوع فایل</th>
            <th className="px-4 text-right font-bold">مدت زمان</th>
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
