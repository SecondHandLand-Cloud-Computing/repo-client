// components/ViewProduct/ProductPagination.jsx
import React from "react";

export default function ProductPagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center gap-3 mt-10">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 rounded-md ${
            currentPage === index + 1 ? "bg-[#7fb685] text-white" : "bg-[#e4f2da]"
          }`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}
