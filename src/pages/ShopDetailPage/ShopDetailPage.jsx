// pages/ViewProduct/ShopDetailPage.jsx
import React from "react";

import Header from "@/components/HomePage/Header";
import Footer from "@/components/HomePage/Footer";

import NewProductGrid from "@/components/HomePage/TodayPick/NewProductGrid";
import ShopHeader from "@/components/ViewProduct/ShopHeader";
import ShopReview from "@/components/ViewProduct/ShopReview";
import { mockReviews } from "@/components/ViewProduct/mockReviews";
import mockProfileData from "@/pages/ProfilePage/ProfileData.js";

const mockProducts = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  image: `https://picsum.photos/400/400?random=${i}`,
  title: "Vintage Denim Jacket",
  condition: "Like New",
  points: 36,
  oldPoints: 67,
  discount: "45%",
}));

export default function ShopDetailPage() {
  // product list is passed directly into NewProductGrid; search handled inside that component

  return (
    <>
      <Header />
      <ShopHeader profileData={mockProfileData} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <NewProductGrid products={mockProducts} headerTitle={"Shop product"} />
        <ShopReview reviews={mockReviews} />;
      </div>

      <Footer />
    </>
  );
}
