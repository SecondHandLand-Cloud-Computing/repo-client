import React, { useState } from "react";
import NewProductCard from "./NewProductCard";
import mockProductsData from "@/pages/ViewProductPage/mockProductsData.js";

export default function ProductGrid({ products = mockProductsData, headerTitle = "Shop product" }) {
  const ITEMS_PER_PAGE = 10; // 2 rows x 5 columns
  const [page, setPage] = useState(1);

  const filteredProducts = products;

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="my-8 md:my-10">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-gray-700">{headerTitle}</h2>
      </div>

      {/* Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center text-gray-500">No products found.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {currentItems.map((item) => (
            <NewProductCard
              key={item.id}
              image={item.image}
              title={item.title}
              condition={item.condition}
              points={item.points}
              oldPoints={item.oldPoints}
              discount={item.discount}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-10">
          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition
                  ${
                    page === pageNumber
                      ? "bg-[#7dac8c] text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-[#e4f2da]"
                  }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {page < totalPages && (
            <button
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-[#e4f2da]"
            >
              Next
            </button>
          )}
        </div>
      )}
    </div>
  );
}
