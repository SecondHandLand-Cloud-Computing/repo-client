import React from "react";
import { ShoppingCart, MessageCircle, Bell, User, Search, Menu } from "lucide-react";
import logo from "../../assets/images/logo.png";

function HeaderNoNavBar() {
  return (
    <header className="w-full">
      {/* ==== TOP HEADER ==== */}
      <div className="flex items-center justify-between bg-[#7dac8c] px-5 h-[70px]">
        {/* Logo */}
        <div className="h-auto w-auto">
          <img
            src={logo}
            alt="Logo"
            className="h-[70px] object-contain" // nhỏ hơn đúng trong ảnh
          />
        </div>

        {/* Search Bar */}
        <div className="relative w-[25%] flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[40px] pl-4 pr-12 bg-[#f2f4f3] 
                 rounded-lg text-[16px] text-gray-800 outline-none 
                 border border-gray-300"
          />

          {/* Search icon style giống hình: nền vuông bo góc, màu navy */}
          <button
            className="absolute right-1 top-1/2 -translate-y-1/2 
                w-8 h-8 bg-[#2f3b40] rounded-md 
                flex items-center justify-center 
                text-white hover:bg-[#3b4b52] transition"
          >
            <Search size={22} />
          </button>
        </div>

        {/* Icons Right */}
        <div className="flex items-center gap-6 p-10">
          {[ShoppingCart, MessageCircle, Bell, User].map((Icon, idx) => (
            <div
              key={idx}
              className="bg-white w-10 h-10 rounded-full flex items-center justify-center 
                   cursor-pointer hover:bg-gray-200 hover:scale-105 transition shadow"
            >
              <Icon size={20} />
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default HeaderNoNavBar;
