import { Package, Truck, FileText, CreditCard } from "lucide-react";
import PropTypes from "prop-types";

export default function CheckOutSummary({ listPrice }) {
  const totalPrice = listPrice.reduce((acc, curr) => acc + curr, 0);
  const itemCount = listPrice.length;

  const shippingFee = itemCount > 0 ? 2 : 0; // tempted to use change later when have API :v
  const grandTotal = totalPrice + shippingFee;
  window.scroll(0, 0);
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

        {/*<button*/}
        {/*  className="w-full bg-[#7DAC8C] hover:bg-[#7DAC70] text-white rounded-lg p-4 flex items-center justify-between transition-colors group"*/}
        {/*>*/}
        {/*  <div className="flex items-center gap-3">*/}
        {/*    <CreditCard className="w-6 h-6 text-white transition-transform" />*/}
        {/*    <span className="font-['Roboto'] text-lg font-medium">Coupon</span>*/}
        {/*  </div>*/}

        {/*  <span className="font-['Roboto'] text-sm underline font-thin ">*/}
        {/*    Add coupon*/}
        {/*  </span>*/}
        {/*</button>*/}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#283645]">
            <FileText className="w-6 h-6" />
            <span className="font-['Roboto'] text-lg">Total</span>
          </div>
          <span className="font-['Roboto'] text-lg font-medium">{grandTotal} Points</span>
        </div>
      </div>

      <button
        type="button"
        className="w-full bg-[#283645] hover:bg-[#1a242f] text-white rounded-xl px-4 py-3 flex items-center justify-center gap-3 transition-colors group"
      >
        <CreditCard className="w-6 h-6 text-white transition-transform group-hover:scale-110" />
        <span className="font-roboto text-lg font-medium">Place Order</span>
      </button>
    </div>
  );
}

CheckOutSummary.propTypes = {
  listPrice: PropTypes.arrayOf(PropTypes.number).isRequired,
};
