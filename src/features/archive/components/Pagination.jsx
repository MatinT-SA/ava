// src/features/archive/components/Pagination.jsx
export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-4 flex justify-end">
      <nav className="flex items-center gap-2 text-sm font-medium">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-8 w-8 items-center justify-center rounded-md border ${
              currentPage === page
                ? "border-cyan-700 bg-cyan-700 text-white"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
      </nav>
    </div>
  );
}
