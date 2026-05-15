import React from "react";
import { Bell, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const avatarUrl = "https://i.pravatar.cc/200";

  const handleLogout = () => {
    navigate("/login");
  };

  const iconBox =
    "bg-white w-12 h-12 rounded-full flex items-center justify-center " +
    "cursor-pointer hover:bg-gray-200 hover:scale-105 transition " +
    "shadow text-black";

  return (
    <header className="w-full bg-[#7dac8c] border-b">
      <div className="flex items-center justify-between px-8 h-[63px]">
        {/* Logo */}
        <Link to="/admin/dashboard">
          <img src={logo} alt="logo" className="h-10 object-contain" />
        </Link>

        {/* Right icons */}
        <div className="flex items-center gap-6">
          {/* Notification */}
          <button className={`${iconBox} relative`}>
            <Bell size={22} />
            <span className="absolute top-2 right-2 w-2 h-2  rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
