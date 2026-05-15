import React from "react";
import useOrder from "@/hooks/useOrder";
import { Search, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export default function Orders() {
  const { orders, loading, page, setPage, totalPages, totalOrders, searchTerm, setSearchTerm } =
    useOrder({ pageSize: 8 });

  if (loading) {
    return <div className="p-6 text-gray-500">Loading orders...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Orders</h2>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* SEARCH */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              placeholder="Search Order ID..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* TABLE */}
        <table className="w-full text-sm table-fixed">
          <thead className="border-b text-gray-500">
            <tr>
              <th className="py-3 px-2 text-left w-[24%]">Order ID</th>
              <th className="py-3 px-2 text-left w-[23%]">Owner ID</th>
              <th className="py-3 px-2 text-left w-[23%]">Products</th>
              <th className="py-3 px-2 text-left w-[15%]">Date</th>
              <th className="py-3 px-2 text-left w-[15%]">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {orders.map((o) => (
              <tr key={o.orderId} className="hover:bg-gray-50">
                <td className="py-3 px-2 font-medium truncate">{o.orderId || "-"}</td>
                <td className="py-3 px-2 text-xs text-gray-600 truncate">{o.ownerId || "-"}</td>
                <td className="py-3 px-2 text-xs text-gray-600 truncate">{o.productIds || "-"}</td>
                <td className="py-3 px-2 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} className="text-gray-400" />
                    {o.date}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs border font-medium ${o.statusClass}`}
                  >
                    {o.statusLabel}
                  </span>
                </td>
              </tr>
            ))}

            {orders.length === 0 && (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-1">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="w-8 h-8 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-8 h-8 rounded text-sm ${
                  page === num ? "bg-green-50 text-green-700 border" : "hover:bg-gray-50"
                }`}
              >
                {num}
              </button>
            ))}

            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="w-8 h-8 rounded hover:bg-gray-100 disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="text-sm text-gray-500">
            Showing {orders.length} of {totalOrders}
          </div>
        </div>
      </div>
    </div>
  );
}
