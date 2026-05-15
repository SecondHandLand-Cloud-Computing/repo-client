import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../../../components/HomePage/Header";
import Footer from "../../../components/HomePage/Footer";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb.jsx";
import CheckOutSummary from "../../../components/HomePage/Cart/CheckOut/CheckOutSummary";
import CheckoutForm from "../../../components/HomePage/Cart/CheckOut/CheckoutForm";

export default function CheckOutPage() {
  const location = useLocation();

  const listItem = location.state?.listItem || [];

  const handleFormSubmit = (data) => {
    console.log("Form Data Submitted:", data);
  };

  return (
    <div className="min-h-screen bg-[#E7E7E7] flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-[1440px]">
        <Breadcrumb
          items={[
            { label: "Home", href: "/home", active: false },
            { label: "Shopping Cart", href: "/cart", active: false },
            { label: "Checkout", href: "/checkout", active: true },
          ]}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-6 items-start justify-center">
          <div className="w-full lg:flex-1 max-w-2xl">
            <CheckoutForm onSubmit={handleFormSubmit} />
          </div>

          <div className="w-full lg:w-[400px] shrink-0">
            <CheckOutSummary listPrice={listItem} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
