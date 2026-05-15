import React, { useState, useEffect } from "react";
import {User} from "lucide-react";
import axios from "axios";
import bgBanner from "@assets/images/hello.png";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

export default function ProfileHeader() {
  // Khởi tạo state để lưu thông tin user
  const [userData, setUserData] = useState({
    fullName: "Loading...",
    avatar: User,
    rating: "--",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {

        const response = await axios.get("/api/customer/me");
        console.log(response);
        const user = response.data.data;
        console.log(user);
        let avatarUrl = user.avatarPublicUrl || "https://i.pravatar.cc/200";

        setUserData({
          fullName: user.name ? `${user.name.firstName || ""} ${user.name.lastName || ""}`.trim() : "User",
          avatar: avatarUrl,
          rating: "--"
        });

      } catch (error) {
        console.error("Failed to fetch user data for header:", error);
      }
    };

    fetchUserData()
  }, []);

  return (
    <div
      className="w-full px-10 py-10 flex flex-col md:flex-row items-center justify-between bg-green-100 relative"
      style={{
        backgroundImage: `url(${bgBanner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-start gap-8">
        <div className="relative w-fit">
          <img
            src={userData.avatar}
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover shadow-lg border-4 border-white"
          />
          <div className="absolute right-0 bottom-0 bg-white rounded-full p-1.5 shadow cursor-pointer hover:bg-gray-100 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="text-gray-700"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                d="M3 7h3l2-2h6l2 2h3v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"
              />
              <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.2" fill="none" />
            </svg>
          </div>
        </div>

        <div>
          <p className="text-lg text-gray-700 mt-2 font-medium">Welcome,</p>
          <h1 className="text-4xl font-bold text-[#243242] -mt-1">
            {userData.fullName}
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xl font-semibold text-gray-800">{userData.rating}</span>
            {/*<div className="text-[#F9C847] text-xl">★★★★☆</div>*/}
          </div>
        </div>
      </div>
    </div>
  );
}
