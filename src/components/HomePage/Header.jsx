import {React, useState} from "react";
import {User, ShoppingCart, MessageCircle, Bell, Search, Menu } from "lucide-react";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";//link to href

function Header() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    if (searchValue.trim()) {
      navigate(`/home/result?search=${encodeURIComponent(searchValue)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const navItems = [
    { icon: ShoppingCart, path: "/cart" },
    { icon: MessageCircle, path: "/NotFound" },
    { icon: Bell, path: "/NotFound" },
    { icon: User, path: "/profile" },
  ];

  return (
    <header className="w-full">
      <div className="flex items-center justify-between bg-[#7dac8c] px-5 h-[70px]">
        <div className="h-auto w-auto">
          <Link
            to ="/home"
          >
          <img
            src={logo}
            alt="logo"
            className="hidden lg:block h-[70px] object-contain" />
            </Link>
        </div>

        <div className="relative flex items-center w-full max-w-md h-[45px] rounded-lg focus-within:shadow-lg bg-[#f2f4f3] overflow-hidden border border-gray-300">

          <button className="grid place-items-center h-full w-[50px] text-gray-500 hover:bg-gray-200 transition">
            <Menu size={20} />
          </button>

          <input
            type="text"
            placeholder="Search for products,..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="peer h-full w-full pr-2 text-gray-700 outline-none bg-transparent"
          />

          <div className="h-full pr-1 grid place-items-center">
            <button onClick={handleSearch}
                    className="w-8 h-8 rounded bg-[#2f3b40] text-white flex items-center justify-center hover:bg-[#3b4b52] transition">
              <Search size={18} />
            </button>
          </div>

        </div>

        {/* Icons Right */}
        <div className="flex items-center gap-6 p-10">
          {navItems.map((item, idx) => {
            const Icon = item.icon;
            // if (item.path !== "/profile")
              return (
              <Link
                key={idx}
                to={item.path}
                className="bg-white w-12 h-12
                rounded-full flex items-center justify-center
                 cursor-pointer hover:bg-gray-200 hover:scale-105 transition shadow text-black"
              >
                <Icon size={25} />
              </Link>
            );
            // else return (
            //   <Link
            //     key={idx}
            //     to={item.path}
            //     className="group relative flex items-center justify-center w-12 h-12 bg-white rounded-full
            //  shadow-sm border border-gray-100 overflow-hidden
            //  hover:shadow-md hover:scale-110 active:scale-95
            //  transition-all duration-200 ease-out"
            //   >
            //     {/* Image needs sizing constraints to stay inside the circle */}
            //     <img
            //       src={item.icon}
            //       alt="nav-icon"
            //       className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
            //     />
            //   </Link>);
          })}
        </div>
      </div>
    </header>
  );
}

export default Header;
