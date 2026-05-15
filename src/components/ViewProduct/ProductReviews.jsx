import React from "react";
import { Star } from "lucide-react";

export default function ProductReviews({ reviews }) {
  // Normalize review data
  const reviewList = Array.isArray(reviews)
    ? reviews.map((r) => ({
        name: r.reviewer?.name
          ? `${r.reviewer.name.firstName} ${r.reviewer.name.lastName}`
          : "Người dùng",
        avatar: r.reviewer?.avatarPublicUrl || "/default-avatar.png",
        rating: r.rating || 0,
        comment: r.comment || "",
      }))
    : [];

  if (reviewList.length === 0) {
    return (
      <div className="mt-16 text-gray-500">
        <h3 className="font-semibold text-lg mb-2">Review Shop</h3>
        <p>There are no reviews yet</p>
      </div>
    );
  }

  return (
    <div className="mt-16">
      <h3 className="font-semibold text-lg mb-6">Review Shop</h3>
      <div className="space-y-6 max-w-2xl">
        {reviewList.map((r, index) => (
          <div key={index} className="flex gap-4">
            <img src={r.avatar} className="w-12 h-12 rounded-full object-cover" alt={r.name} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{r.name}</span>
                <div className="flex text-yellow-500">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} size={14} />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-1">{r.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
