import React from "react";

export default function ProductDescription({ description }) {
  return (
    <div className="mt-16">
      <h2 className="text-lg font-semibold mb-4">Description</h2>
      <p className="text-gray-600 text-sm leading-relaxed max-w-3xl">{description}</p>
    </div>
  );
}
