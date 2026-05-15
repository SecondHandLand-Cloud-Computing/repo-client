import React from "react";
import { Package, Truck, FileText, CreditCard } from "lucide-react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function OrderSummary({ listPrice }) {
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (listPrice.length === 0) return;
    navigate("/checkout", { state: { listItem: listPrice } });
  };

  const totalPrice = listPrice.reduce((acc, curr) => acc + curr, 0);
  const itemCount = listPrice.length;
  const shippingFee = itemCount > 0 ? 2 : 0;
  const grandTotal = totalPrice + shippingFee;

  return (
    <div className="bg-[#CFDDC6] mx-auto rounded-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-['Roboto'] font-bold text-xl text-black">Order Summary</h2>
        <span className="text-gray-500 font-['Roboto']">{itemCount} items</span>
      </div>

      <div className="space-y-4 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#283645]">
            <Package className="w-6 h-6" />
            <span className="font-['Roboto'] text-lg">Item Total</span>
          </div>
          <span className="font-['Roboto'] text-lg font-medium">{totalPrice} Points</span>
        </div>

        <div className="flex justify-between">
          <div className="flex items-center gap-3 text-[#283645]">
            <Truck className="w-6 h-6" />
            <span className="font-['Roboto'] text-lg">Shipping Fee</span>
          </div>
          <span className="font-['Roboto'] text-lg font-medium">{shippingFee} Points</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#283645]">
            <FileText className="w-6 h-6" />
            <span className="font-['Roboto'] text-lg">Subtotal</span>
          </div>
          <span className="font-['Roboto'] text-lg font-medium">{grandTotal} Points</span>
        </div>
      </div>

      <button
        onClick={handleCheckout}
        className={`w-full p-4 flex items-center justify-center gap-3 transition-colors rounded-xl ${
          listPrice.length === 0
            ? "bg-gray-500 text-gray-300 cursor-not-allowed"
            : "bg-[#283645] hover:bg-[#1a242f] text-white"
        }`}
      >
        <CreditCard className="w-6 h-6" />
        <span className="font-['Roboto'] text-lg font-medium">Checkout</span>
      </button>
    </div>
  );
}

OrderSummary.propTypes = {
  listPrice: PropTypes.arrayOf(PropTypes.number).isRequired,
};
