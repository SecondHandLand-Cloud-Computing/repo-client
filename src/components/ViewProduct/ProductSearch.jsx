// components/ViewProduct/ProductSearch.jsx
import React from "react";

export default function ProductSearch({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search product name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border px-4 py-2 rounded-lg w-full md:w-80 mb-6"
    />
  );
}
