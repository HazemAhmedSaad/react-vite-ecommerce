import"./Pagination.css";
export default function Pagination({ page, totalPages, onPageChange }) {
  const getPagination = () => {
    const pages = [];
    const delta = 1;

    pages.push(1);
    let start = Math.max(2, page - delta);
    let end = Math.min(totalPages - 1, page + delta);

    if (start > 2) pages.push("...");

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages - 1) pages.push("...");

    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPagination();

  return (
    <div className="pagination-container">
      {/* prev */}
      <button
        className="page-btn"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ‹
      </button>

      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="page-dots">
            ...
          </span>
        ) : (
          <button
            key={i}
            className={`page-btn ${page === p ? "active" : ""}`}
            onClick={() => onPageChange(p)}
          >
            {p}
          </button>
        ),
      )}

      {/* next */}
      <button
        className="page-btn"
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        ›
      </button>
    </div>
  );
}