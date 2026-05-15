import React from "react";

export default function NewProductCard({ image, title, condition, points, oldPoints, discount }) {
  return (
    <div
      className="bg-[#e4f2da] rounded-lg overflow-hidden shadow-sm transform transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer flex flex-col h-full"
    >
      {/* IMAGE */}
      <div className="relative w-full h-48 overflow-hidden flex-shrink-0">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
        />
      </div>

      {/* CONTENT */}
      <div className="p-2 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-xs truncate">{title}</h3>

          {/* CONDITIONS */}
          <div className="flex gap-1 mt-1">
            <span className="border px-2 py-0.5 rounded-md text-[11px] text-[#f89842] bg-white transition-colors duration-200 hover:bg-[#f89842] hover:text-white">
              {condition}
            </span>
          </div>
        </div>

        <div className="mt-1 text-xs">
          <span className="font-semibold">{points} pts</span>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-gray-500 line-through">
          {oldPoints} pts
        </div>

        <div className="text-[11px] text-green-600 font-semibold">{discount} off</div>
      </div>
    </div>
  );
}
