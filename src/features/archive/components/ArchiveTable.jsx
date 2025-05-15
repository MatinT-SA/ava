import { useState, useEffect } from "react";
import ArchiveRow from "./ArchiveRow";
import Pagination from "./Pagination";
import { fetchArchiveItems } from "../../../services/apiService";
import { fakeArchiveData } from "../data/fakeArchiveData";

export default function ArchiveTable() {
  const [archiveItems, setArchiveItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const itemsPerPage = 5;

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      try {
        const data = await fetchArchiveItems();

        if (Array.isArray(data) && data.length > 0) {
          setArchiveItems(data);
        } else {
          setArchiveItems(fakeArchiveData);
        }
      } catch (err) {
        console.error("API error. Using mock data.", err);
        setArchiveItems(fakeArchiveData);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const totalPages = Math.ceil(archiveItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = archiveItems.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

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
        </>
      )}
    </div>
  );
}
