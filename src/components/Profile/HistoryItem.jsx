// ==============================
// File: components/Profile/HistoryItem.jsx
// ==============================
import React from "react";
import { Store } from "lucide-react";

export default function HistoryItem({ item }) {
  return (
    <div
      className="
        bg-white rounded-xl p-4 sm:p-5 shadow-sm mb-5
        flex flex-col sm:flex-row
        sm:items-center sm:justify-between
        gap-4
      "
    >
      {/* Left: Image + Info */}
      <div className="flex items-start sm:items-center gap-4 sm:gap-5">
        <img
          src={item.image}
          alt={item.title}
          className="
            w-20 h-20
            sm:w-24 sm:h-24
            rounded-lg object-cover
            flex-shrink-0
          "
        />

        <div className="min-w-0">
          <h3
            className="
              font-semibold text-base sm:text-lg text-gray-800
              truncate
            "
            title={item.title}
          >
            {item.title}
          </h3>

          <div className="flex items-center gap-1 text-sm text-gray-500 truncate">
            <Store className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{item.shop}</span>
          </div>

          <p className="text-sm text-gray-400 mt-1">Price: {item.price} points</p>
        </div>
      </div>

      {/* Right: Total */}
      <div className="text-right sm:text-left">
        <p className="font-semibold text-green-600 text-sm sm:text-base">
          Total {item.price} points
        </p>
      </div>
    </div>
  );
}
