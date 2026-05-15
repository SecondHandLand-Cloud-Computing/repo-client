import React from "react";
import { useSearchParams } from "react-router-dom"; // 1. Import hook này
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import ProductGrid from "../../components/HomePage/TodayPick/ProductGrid";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.jsx";

const ListProducts = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("search");

  const displayTitle = query ? `Search Result: "${query}"` : "All Products";

  return (
    <div className="min-h-screen bg-[#E7E7E7] flex flex-col">
      <Header />
      <div className= "max-w-[1440px] px-4 py-4">
        <Breadcrumb
          items={[
            { label: "Home", href: "/home", active: false },
            { label: "Shopping Cart", href: "/home/search", active: true },
          ]}
        />

      <ProductGrid
        headerTitle={displayTitle}
        searchQuery={query}
        mode = "pagination"
      />
      </div>
      <Footer />
    </div>
  );
};

export default ListProducts;