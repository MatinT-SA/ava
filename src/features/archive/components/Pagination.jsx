import ArrowIconRight from "../../../assets/icons/ArrowIconRight";
import ArrowIconLeft from "../../../assets/icons/ArrowIconLeft";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];

  const getMiddlePages = () => {
    const pages = [];
    for (let i = currentPage + 1; i >= currentPage - 2; i--) {
      if (i > 0 && i <= totalPages && !pages.includes(i)) {
        pages.push(i);
      }
    }
    return pages.sort((a, b) => b - a);
  };

  if (totalPages > 1 && currentPage < totalPages) {
    pageNumbers.push(totalPages);
  }

  const middle = getMiddlePages();
  pageNumbers.push("...");
  pageNumbers.push(...middle);
  pageNumbers.push("...");

  if (currentPage > 1) {
    pageNumbers.push(1);
  }

  const finalPages = pageNumbers.reverse();

  return (
    <div className="rtl mt-10 flex items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-black hover:bg-gray-200 disabled:opacity-40"
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
            onClick={() => onPageChange(page)}
            className={`flex h-8 w-8 cursor-pointer items-center justify-center border-none text-sm text-black ${
              page === currentPage
                ? "rounded-full bg-[#07B49B] text-white"
                : "rounded hover:bg-gray-200"
            }`}
          >
            {convertToPersianNumber(page)}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded text-black hover:bg-gray-200 disabled:opacity-40"
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
