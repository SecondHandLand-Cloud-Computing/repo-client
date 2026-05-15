// components/ViewProduct/ShopReview.jsx
import React from "react";

export default function ShopReview({ reviews = [] }) {
  if (reviews.length === 0) {
    return <p className="text-gray-500 mt-10 text-center">No reviews yet</p>;
  }

  return (
    <div className="my-8 md:my-10">
      <h2 className="text-2xl font-medium text-gray-700 mb-6">Review Shop</h2>

      {reviews.map((review) => (
        <div key={review.id} className="flex gap-4 mb-6">
          <img src={review.avatar} className="w-10 h-10 rounded-full" alt={review.user} />

          <div>
            <p className="font-semibold">
              {review.user} <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
            </p>

            <p className="text-sm text-gray-600">{review.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
