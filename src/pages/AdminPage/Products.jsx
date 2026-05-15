import React, { useState } from "react";
import { Search, MoreHorizontal, ChevronRight, ChevronLeft } from "lucide-react";
import useProducts from "@/hooks/useProducts";

export default function Products() {
  const {
    products,
    page,
    setPage,
    searchTerm,
    setSearchTerm,
    totalPages,
    totalResults,
    updateProductStatus,
  } = useProducts({ pageSize: 8 });

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [statusValue, setStatusValue] = useState("");

  /* ===== STATUS COLOR ===== */
  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-500";
      case "pending":
        return "text-blue-400";
      case "sold":
        return "text-purple-500";
      case "deleted":
        return "text-orange-500";
      case "rejected":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const handleUpdateStatus = async () => {
    await updateProductStatus({
      id: selectedProduct.id,
      status: statusValue,
    });

    setSelectedProduct(null);
    setStatusValue("");
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Products</h2>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* ===== SEARCH ===== */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* ===== TABLE ===== */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-fixed">
            <thead className="border-b text-gray-500">
              <tr>
                <th className="py-3 px-2 text-left w-[35%]">Product</th>
                <th className="py-3 px-2 text-left w-[25%]">Product ID</th>
                <th className="py-3 px-2 text-left w-[15%]">Customer</th>
                <th className="py-3 px-2 text-left w-[10%]">Status</th>
                <th className="py-3 px-2 text-left w-[10%]">Price</th>
                <th className="py-3 px-2 text-right w-[5%]">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  {/* PRODUCT */}
                  <td className="py-3 px-2">
                    <div className="flex items-center gap-3 truncate">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-md object-cover shrink-0"
                      />
                      <span className="font-medium truncate">{p.name}</span>
                    </div>
                  </td>

                  {/* PRODUCT ID */}
                  <td className="py-3 px-2 text-xs text-gray-600 truncate">{p.id}</td>

                  {/* CUSTOMER */}
                  <td className="py-3 px-2 text-xs text-gray-600 truncate">{p.customerName}</td>

                  {/* STATUS */}
                  <td className={`py-3 px-2 font-medium truncate ${getStatusColor(p.status)}`}>
                    {p.status}
                  </td>

                  {/* PRICE */}
                  <td className="py-3 px-2 font-medium truncate">{p.price.toLocaleString()} pts</td>

                  {/* ACTION */}
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => {
                        setSelectedProduct(p);
                        setStatusValue(p.status);
                      }}
                      className="p-1 rounded-full hover:bg-gray-100"
                    >
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}

              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ===== PAGINATION ===== */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="disabled:opacity-30"
            >
              <ChevronLeft />
            </button>

            <span className="text-sm">
              Page {page} / {totalPages}
            </span>

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="disabled:opacity-30"
            >
              <ChevronRight />
            </button>
          </div>

          <div className="text-sm text-gray-500">{totalResults} results</div>
        </div>
      </div>

      {/* ===== MODAL ===== */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4">Change Product Status</h3>

            <Select
              label="Status"
              value={statusValue}
              options={["active", "pending", "sold", "rejected", "deleted"]}
              onChange={setStatusValue}
            />

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 border rounded-lg text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdateStatus}
                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===== SELECT ===== */
function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 px-3 py-2 border rounded-lg text-sm"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
