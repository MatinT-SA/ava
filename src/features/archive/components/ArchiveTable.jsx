import { useState, useEffect } from "react";
import ArchiveRow from "./ArchiveRow";
import Pagination from "./Pagination";
import { fetchArchiveItems } from "../../../services/apiService";

export default function ArchiveTable() {
  const [archiveData, setArchiveData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    async function loadData(page = 1) {
      setIsLoading(true);
      setError("");
      try {
        const data = await fetchArchiveItems(page);
        setArchiveData(data);
      } catch (err) {
        setError("خطا در دریافت آرشیو");
      } finally {
        setIsLoading(false);
      }
    }

    loadData(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(archiveData.count / itemsPerPage);

  function handleDelete(id) {
    setArchiveData((prevData) => ({
      ...prevData,
      results: prevData.results.filter((item) => item.id !== id),
      count: prevData.count - 1,
    }));
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white px-12 py-6">
      <h1 className="text-custom-teal mb-6 text-2xl">آرشیو من</h1>

      {isLoading && (
        <p className="mb-4 text-center text-gray-500">در حال بارگذاری...</p>
      )}

      {error && <p className="mb-4 text-center text-orange-500">{error}</p>}

      {!isLoading && (
        <>
          <div className="w-full overflow-x-auto sm:overflow-x-visible">
            <table className="w-full min-w-[700px] border-separate border-spacing-y-4 text-center">
              <thead>
                <tr className="rounded-md text-sm font-bold text-black">
                  <th></th>
                  <th className="px-8 pt-4 pb-5 text-right font-bold">
                    نام فایل
                  </th>
                  <th className="px-4 font-bold">تاریخ بارگذاری</th>
                  <th className="px-4 font-bold">نوع فایل</th>
                  <th className="px-4 font-bold">مدت زمان</th>
                </tr>
              </thead>
              <tbody>
                {archiveData.results.map((item) => (
                  <ArchiveRow
                    key={item.id}
                    item={item}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
}
