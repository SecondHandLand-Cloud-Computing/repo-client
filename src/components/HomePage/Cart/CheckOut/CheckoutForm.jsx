import React, { useState } from "react";
import { ChevronDown, Plus, Bookmark } from "lucide-react";
import PropTypes from "prop-types";

export default function CheckoutForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    fullName: "The blackest nigga",
    phone: "000000000",
    district: "Nigga Hill",
    specificAddress: "Left Right Right Left",
    addressType: "Tree", // Default value will change later ~~
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleTypeChange = (type) => {
  //   setFormData(prev => ({ ...prev, addressType: type }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 w-full font-roboto">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">Checkout</h2>
      <p className="text-slate-600 mb-6">Delivery Information</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-sm font-medium text-slate-800 mb-1">
              Full name
            </label>
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-slate-400 rounded-[4px] px-3 py-2 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="text-sm font-medium text-slate-800 mb-1">
              Phone number
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-slate-400 rounded-[4px] px-3 py-2 focus:outline-none focus:border-slate-600 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="district" className="text-sm font-medium text-slate-800 mb-1">
            District
          </label>
          <div className="relative">
            <select
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              className="w-full appearance-none bg-gray-200 border border-slate-400 rounded-[4px] px-3 py-2.5 text-slate-500 focus:outline-none cursor-pointer transition-colors"
            >
              <option value="" disabled>
                Select District in Ho Chi Minh City...
              </option>
              <option value="d1">District 1</option>
              <option value="d2">District 2</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-600 w-5 h-5 pointer-events-none" />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="specificAddress" className="text-sm font-medium text-slate-800 mb-1">
            Specific Address
          </label>
          <input
            id="specificAddress"
            name="specificAddress"
            type="text"
            placeholder="Your Specific Address"
            value={formData.specificAddress}
            onChange={handleChange}
            className="w-full border border-slate-400 rounded-[4px] px-3 py-2.5 text-slate-600 placeholder-slate-400 focus:outline-none focus:border-slate-600 transition-colors"
          />
        </div>

        {/*<div className="w-full h-36 border border-slate-400 rounded-lg bg-slate-50 relative overflow-hidden flex items-center justify-center group cursor-pointer hover:border-slate-500 transition-colors">*/}
        {/*  <div className="absolute inset-0 opacity-10"*/}
        {/*       style={{ backgroundImage: 'radial-gradient(#cbd5e1 2px, transparent 2px)', backgroundSize: '20px 20px' }}>*/}
        {/*  </div>*/}
        {/*  <button type="button" className="relative z-10 bg-white border border-slate-300 px-4 py-2 rounded shadow-sm flex items-center gap-2 text-sm text-slate-500 group-hover:bg-slate-50 transition-colors">*/}
        {/*    <Plus className="w-4 h-4" />*/}
        {/*    Add an Address*/}
        {/*  </button>*/}
        {/*</div>*/}

        {/*<div className="flex flex-col mt-2">*/}
        {/*  <span className="text-sm font-medium text-slate-800 mb-2">Address Type</span>*/}
        {/*  <div className="flex gap-4">*/}
        {/*    {['Private House', 'Office'].map((type) => (*/}
        {/*      <button*/}
        {/*        key={type}*/}
        {/*        type="button"*/}
        {/*        onClick={() => handleTypeChange(type)}*/}
        {/*        className={`px-6 py-2.5 rounded-[4px] text-sm font-medium transition-colors border ${*/}
        {/*          formData.addressType === type*/}
        {/*            ? 'bg-[#7ca78c] border-[#7ca78c] text-white'*/}
        {/*            : 'bg-white border-slate-300 text-slate-600 hover:bg-gray-50'*/}
        {/*        }`}*/}
        {/*      >*/}
        {/*        {type}*/}
        {/*      </button>*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}

        {/*<div className="pt-4">*/}
        {/*  <button*/}
        {/*    type="submit"*/}
        {/*    className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors group"*/}
        {/*  >*/}
        {/*    <Bookmark className="w-5 h-5 group-hover:fill-current" />*/}
        {/*    <span className="underline text-sm">Save this address</span>*/}
        {/*  </button>*/}
        {/*</div>*/}
      </form>
    </div>
  );
}

CheckoutForm.propTypes = {
  onSubmit: PropTypes.arrayOf(PropTypes.number).isRequired,
};
