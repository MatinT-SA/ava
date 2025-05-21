import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../../redux/archiveSlice";
import ArrowIconRight from "../../../assets/icons/ArrowIconRight";
import ArrowIconLeft from "../../../assets/icons/ArrowIconLeft";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.archive.currentPage);

  // سلکتور ساده تو خود کامپوننت
  const totalPages = useSelector((state) => {
    const itemsPerPage = state.archive.itemsPerPage || 10; // اگر نداریم ۱۰ فرض کن
    const totalCount = state.archive.count || 0;
    return Math.ceil(totalCount / itemsPerPage);
  });

  const finalPages = [];

  finalPages.push(1);

  if (currentPage - 2 > 1) {
    finalPages.push("...");
  }

  if (currentPage - 1 > 1) {
    finalPages.push(currentPage - 1);
  }

  if (currentPage !== 1 && currentPage !== totalPages) {
    finalPages.push(currentPage);
  }

  if (currentPage + 1 < totalPages) {
    finalPages.push(currentPage + 1);
  }

  if (currentPage + 2 < totalPages) {
    finalPages.push(currentPage + 2);
  }

  if (currentPage + 2 < totalPages - 1) {
    finalPages.push("...");
  }

  if (totalPages > 1) {
    finalPages.push(totalPages);
  }

  const handlePageChange = (page) => {
    if (page !== "..." && page !== currentPage) {
      dispatch(setCurrentPage(page));
    }
  };

  return (
    <div className="rtl mt-10 flex items-center justify-center gap-1.5 text-sm">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded px-5 pl-0 text-black disabled:opacity-40"
      >
        <ArrowIconRight />
      </button>

      {finalPages.map((page, index) =>
        page === "..." ? (
          <span key={index} className="px-2 text-black">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`flex h-5 w-5 cursor-pointer items-center justify-center text-sm text-black ${
              page === currentPage
                ? "bg-green-pagination rounded-full text-white"
                : "rounded"
            }`}
          >
            {convertToPersianNumber(page)}
          </button>
        ),
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded px-5 pr-0 text-black disabled:opacity-40"
      >
        <ArrowIconLeft />
      </button>
    </div>
  );
};

function convertToPersianNumber(num) {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[+d]);
}

export default Pagination;
