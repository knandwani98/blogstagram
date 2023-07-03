import React from "react";
import "./pagination.scss";

const Pagination = ({ pageVisible, handlePage, totalPages }) => {
  let allPages = [];

  for (let i = pageVisible - 1; i < totalPages; i++) {
    allPages.push(i);
  }

  return (
    <section className="pagination flex">
      {/* Prev Button */}

      {pageVisible > 1 && (
        <button onClick={() => handlePage("prev")}>Prev</button>
      )}

      {allPages.length > 1 &&
        allPages.map((page, i) => {
          if (i < 10) {
            return (
              <button
                onClick={() => handlePage(page + 1)}
                key={page}
                className={pageVisible === page + 1 ? "page active" : "page"}
              >
                {page + 1}
              </button>
            );
          }
        })}

      {/* Next Button */}
      {pageVisible < totalPages && (
        <button onClick={() => handlePage("next")}>Next</button>
      )}
    </section>
  );
};

export default Pagination;
