import React from "react";
import PropTypes from "prop-types";
import loginImage from "../../assets/images/login-banner.jpg";

const AuthLayout = ({ title, children }) => {
  return (
    <div className="flex h-screen w-full font-['Roboto','Inter',sans-serif] bg-white overflow-hidden">
      {/* Left side (image) */}
      <div className="flex-1 flex justify-center items-center bg-[#8fb996] p-8 min-w-[300px]">
        <img
          src={loginImage}
          alt="Auth banner"
          className="w-full max-w-[600px] h-auto rounded-xl border-[10px] border-[#7fa88d] object-cover shadow-[0_12px_30px_rgba(0,0,0,0.15)] bg-white"
        />
      </div>

      {/* Right side (form) */}
      <div className="flex-1 flex justify-center items-center p-8 md:p-12 min-w-[300px] overflow-y-auto">
        <div className="w-full max-w-[500px] bg-white rounded-2xl p-12 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.08)] animate-fadeIn">
          <h1 className="text-3xl font-bold text-[#2d3436] mb-2 text-center">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default AuthLayout;
