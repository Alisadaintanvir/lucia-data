"use client";
import { useFilterContext } from "@/hooks/useFilter";
function Pagination() {
  const { filters, setFilters } = useFilterContext();
  const currentPage = Number(filters.currentPage);

  return (
    <div className="pagination join flex justify-center gap-2">
      <button
        className="join-item btn btn-sm rounded-md"
        onClick={() =>
          setFilters((prev) => {
            if (currentPage === 1) return;
            return { ...prev, currentPage: currentPage - 1 };
          })
        }
        disabled={currentPage === 1}
      >
        «
      </button>
      <button className="join-item btn btn-sm btn-primary text-white ">
        {currentPage}
      </button>
      <button
        className="join-item btn btn-sm rounded-md"
        onClick={() =>
          setFilters((prev) => ({ ...prev, currentPage: currentPage + 1 }))
        }
      >
        »
      </button>
    </div>
  );
}

export default Pagination;
