import React, { useMemo, useState } from "react";
import HistoryItem from "./HistoryItem";

export default function HistoryList({ data }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 4;

  // Filter by name
  const filteredData = useMemo(() => {
    return data.filter((item) => item.title.toLowerCase().includes(search.toLowerCase()));
  }, [data, search]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  const paginatedData = filteredData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">My Order History</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by product name..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
        }}
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-green-600 outline-none"
      />

      {/* List */}
      {paginatedData.length > 0 ? (
        paginatedData.map((item) => <HistoryItem key={item.id} item={item} />)
      ) : (
        <p className="text-gray-500">No results found.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded border transition ${
                page === i + 1
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white text-gray-600 hover:bg-green-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
