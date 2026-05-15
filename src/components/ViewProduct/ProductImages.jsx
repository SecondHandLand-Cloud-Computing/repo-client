import React from "react";

export default function ProductImages({ image }) {
  return (
    <img
      src={image}
      className="w-full h-[420px] object-cover rounded-lg
                 transition-transform duration-300 hover:scale-105"
      alt="product"
    />
  );
}
