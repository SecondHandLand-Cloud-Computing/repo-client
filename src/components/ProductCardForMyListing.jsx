import React from "react";
import { Link } from "react-router-dom";
import { Pencil, Trash2 } from "lucide-react";
import { productApi } from "@/api/authApi";

export default function ProductCard({ product, onDeleted }) {
  // ✅ theo API: active / pending / rejected đều được xoá + sửa
  const canEditDelete = ["active", "pending", "rejected"].includes(product.status);

  const handleDelete = async () => {
    if (!window.confirm("Bạn chắc chắn muốn xoá sản phẩm này?")) return;

    try {
      await productApi.delete(product.id);
      onDeleted?.(product.id); // ✅ sync UI
    } catch (err) {
      console.error("❌ Delete product error:", err);
      alert("Không thể xoá sản phẩm");
    }
  };

  return (
    <div className="flex gap-5 bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition">
      {/* IMAGE */}
      <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* INFO */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-[#243242] line-clamp-2">
              {product.name}
            </h3>

            {/* STATUS */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                product.status === "active"
                  ? "bg-green-100 text-green-700"
                  : product.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status}
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          {/* PRICE */}
          <div className="text-base font-bold text-black-500">
            {product.price} points
          </div>

          {/* ACTIONS */}
          {canEditDelete && (
            <div className="flex items-center gap-3">
              <Link
                to={`/my-listing/edit/${product.id}`}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <Pencil className="w-4 h-4" />
                Edit
              </Link>

              <button
                onClick={handleDelete}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-full border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
