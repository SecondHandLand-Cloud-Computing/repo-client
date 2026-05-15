import React from "react";
import { Star, MessageCircle, MapPin } from "lucide-react";

export default function ShopOwnerCard({ owner, reviews = [] }) {
  if (!owner) return null;

  const fullName =
    typeof owner.name === "string"
      ? owner.name
      : `${owner.name?.firstName || ""} ${owner.name?.lastName || ""}`.trim() || "Seller";

  const avatarUrl = owner.avatarPublicUrl || "/default-avatar.png";

  // Calculate average rating
  const averageRating =
    reviews.length > 0 ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length : 0;

  const roundedRating = Math.round(averageRating); // For full stars

  return (
    <div className="flex items-center gap-4 mb-12 p-4 bg-green-50 rounded-lg border border-green-100">
      <img src={avatarUrl} alt={fullName} className="w-16 h-16 rounded-full object-cover" />

      <div className="flex flex-col gap-1">
        <div className="font-semibold text-gray-800">{fullName}</div>

        {owner.address && (
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <MapPin size={14} className="text-green-500" />
            <span>{owner.address}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-yellow-500 text-sm">
          {/* Display full stars */}
          {Array.from({ length: roundedRating }).map((_, i) => (
            <Star key={i} size={14} />
          ))}
          {reviews.length > 0 && <span className="text-gray-600">{averageRating.toFixed(1)} </span>}
          {reviews.length === 0 && <span className="text-gray-600">No ratings yet</span>}
        </div>

        {/* Number of reviews */}
        {reviews.length > 0 && (
          <span className="text-gray-600 text-xs">{reviews.length} reviews</span>
        )}
      </div>

      <button className="ml-auto px-4 py-2 flex items-center gap-2 rounded-md bg-[#7dac8c] text-white hover:bg-green-200">
        <MessageCircle size={16} />
        Chat with shop
      </button>
    </div>
  );
}
