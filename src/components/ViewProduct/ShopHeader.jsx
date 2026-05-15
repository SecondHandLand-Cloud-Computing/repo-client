import bgBanner from "@assets/images/hello.png";
import React from "react";
import PropTypes from "prop-types";

export default function ProfileHeader({ profileData }) {
  return (
    <div
      className="w-full min-h-[160px] flex items-center px-20 relative bg-green-100 relative"
      style={{
        backgroundImage: `url(${bgBanner})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Avatar */}
      <div className="relative">
        <img
          src="https://i.pravatar.cc/200"
          alt="avatar"
          className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
        />

        {/* Camera icon */}
        {/* <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            className="text-gray-700"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              d="M3 7h3l2-2h6l2 2h3v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"
            />
            <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        </div> */}
      </div>

      {/* Info */}
      <div className="ml-12 grid grid-cols-[140px_auto] gap-y-4 text-gray-700">
        {/* Shop ID */}
        <span className="font-medium">Shop ID:</span>
        <span className="font-semibold">V9YEDBBQIQU18</span>

        {/* Shop Name */}
        <span className="font-medium">Shop Name:</span>
        <span className="font-semibold">{profileData.fullName}</span>

        {/* Rating */}
        <span className="font-medium">Rating:</span>
        <span className="text-yellow-500 text-lg font-semibold">★★★★★</span>
      </div>
    </div>
  );
}

ProfileHeader.propTypes = {
  profileData: PropTypes.object.isRequired,
};
