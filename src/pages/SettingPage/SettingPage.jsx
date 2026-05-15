import React from "react";

import { useNavigate } from "react-router-dom";

import HeaderNoNavBar from "../../components/AllPage/HeaderNoNavBar";
import Footer from "../../components/HomePage/Footer";

const SettingsPageContent = () => {
  const navigate = useNavigate();

  const SettingItem = ({ label, link, action }) => (
    <div
      onClick={action ? action : () => navigate(link || "#")}
      className="flex justify-between items-center py-4 px-4 sm:px-6 cursor-pointer hover:bg-green-50/50 transition duration-150 border-t border-dotted border-gray-300"
    >
      <span className="text-base text-gray-800">{label}</span>
      <span className="text-xl text-gray-500 font-light">›</span>
    </div>
  );

  const ToggleItem = ({ label, initialChecked }) => (
    <div className="flex justify-between items-center py-4 px-4 sm:px-6 border-t border-dotted border-gray-300">
      <span className="text-base text-gray-800">{label}</span>
      <label htmlFor={`toggle-${label}`} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            type="checkbox"
            id={`toggle-${label}`}
            className="sr-only"
            defaultChecked={initialChecked}
          />

          <div className="block bg-gray-300 w-11 h-6 rounded-full"></div>

          <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform translate-x-0"></div>
        </div>
      </label>

      <style jsx>{`
        input:checked ~ .block {
          background-color: #70bbb4; /* Màu xanh lá ON */
        }
        input:checked ~ .dot {
          transform: translateX(1.25rem);
        }
      `}</style>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl min-h-screen mt-8 mb-8 rounded-2xl">
      <div className="p-4 sm:p-6">
        <h1 className="flex items-center text-3xl font-semibold text-gray-800 pb-4 mb-4 border-b border-dotted">
          <span className="mr-3 text-2xl">⚙️</span> Settings
        </h1>

        <div className="mb-8 border-b border-dotted pb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2 px-4 sm:px-6">Account</h2>
          <div className="bg-green-50/50">
            <SettingItem label="Change password" link="/change-password" />
          </div>
        </div>

        <div className="mb-8 border-b border-dotted pb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2 px-4 sm:px-6">Notifications</h2>
          <div className="bg-green-50/50">
            <ToggleItem label="Sales" initialChecked={true} />
            <ToggleItem label="Events" initialChecked={false} />
            <ToggleItem label="Email" initialChecked={false} />
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold text-gray-900 mb-2 px-4 sm:px-6">More</h2>
          <div className="bg-green-50/50">
            <SettingItem label="Language" link="/language" />
            <SettingItem label="About us" link="/about" />
            <SettingItem label="Privacy policy" link="/privacy" />
            <SettingItem label="Terms and conditions" link="/terms" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function SettingPage() {
  return (
    <>
      <HeaderNoNavBar />
      <SettingsPageContent />
      <Footer />
    </>
  );
}
