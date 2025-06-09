import { FC, JSX } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePageChange,
}: PaginationProps): JSX.Element => {
  return (
    <div className="mt-10 flex flex-wrap justify-center gap-2 text-sm">
      <button
        className="cursor-pointer rounded border border-primary px-3 py-1 hover:bg-primaryLight dark:bg-grey"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={`cursor-pointer rounded border px-3 py-1 ${
            currentPage === page
              ? "border-primary bg-primary text-foreground dark:bg-primaryActive dark:text-white"
              : "border-primaryActive hover:bg-primaryLight dark:bg-grey"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="cursor-pointer rounded border border-primary px-3 py-1 hover:bg-primaryLight dark:bg-grey"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
};

export default Pagination;
