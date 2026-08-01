interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-md border border-(--color-border)
        flex items-center justify-center
        transition
        hover:bg-gray-100
        disabled:opacity-40
        disabled:cursor-not-allowed"
      >
        ←
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-md font-semibold transition
              ${
                currentPage === page
                  ? "bg-(--color-accent) text-white"
                  : "border border-(--color-border) hover:bg-gray-100"
              }`}
          >
            {page}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-md border border-(--color-border)
        flex items-center justify-center
        transition
        hover:bg-gray-100
        disabled:opacity-40
        disabled:cursor-not-allowed"
      >
        →
      </button>
    </div>
  );
}

export default Pagination;