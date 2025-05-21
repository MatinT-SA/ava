import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ArchiveRow from "./ArchiveRow";
import Pagination from "./Pagination";
import {
  loadArchive,
  setCurrentPage,
  removeArchiveItem,
} from "../../../redux/archiveSlice";

export default function ArchiveTable() {
  const dispatch = useDispatch();
  const { count, results, currentPage, isLoading, error } = useSelector(
    (state) => state.archive,
  );

  const itemsPerPage = 10;
  const totalPages = Math.ceil(count / itemsPerPage);

  useEffect(() => {
    dispatch(loadArchive(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = (id) => {
    dispatch(removeArchiveItem(id));
  };

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
            <table className="w-full min-w-[700px] border-collapse border-spacing-y-4 text-center">
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
                {results.map((item) => (
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
            onPageChange={(page) => dispatch(setCurrentPage(page))}
          />
        </>
      )}
    </div>
  );
}
