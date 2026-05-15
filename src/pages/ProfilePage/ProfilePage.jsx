import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  CreditCard,
  MapPin,
  Eye,
  EyeOff,
  Plus,
  Save,
  Lock,
  Mail,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Components
import Header from "../../components/HomePage/Header";
import InfoApp from "../../components/HomePage/InfoApp";
import Footer from "../../components/HomePage/Footer";
import SideBar from "@/components/Profile/SideBar.jsx";
import ProfileHeader from "@/components/Profile/ProfileHeader.jsx";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  // State for form data
  const [profileData, setProfileData] = useState({
    fullName: "Loading...",
    email: "",
    phone: "",
    address: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // State for change detection
  const [initialData, setInitialData] = useState({});

  // Password visibility toggles
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  // Check if data has changed
  const hasChanges = JSON.stringify({
    fullName: profileData.fullName,
    email: profileData.email,
    phone: profileData.phone,
    address: profileData.address
  }) !== JSON.stringify({
    fullName: initialData.fullName,
    email: initialData.email,
    phone: initialData.phone,
    address: initialData.address
  }) || (profileData.newPassword && profileData.newPassword.length > 0);

  // --- FETCH USER DATA (Đã đồng bộ với logic ProfileHeader của bạn) ---
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Sử dụng đúng endpoint bạn đã dùng ở ProfileHeader
        const response = await axios.get("/api/customer/me");

        // Truy cập vào .data.data theo cấu trúc API của bạn
        const user = response.data.data;

        const mappedData = {
          fullName: user.name ? `${user.name.firstName || ""} ${user.name.lastName || ""}`.trim() : "User",
          email: user.mail || user.email || "",
          phone: user.phone || "N/A",
          address: user.address || "No address provided",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        };

        setProfileData(mappedData);
        setInitialData(mappedData);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    console.log("Saving Updated Profile Data:", profileData);
    alert("Update feature coming soon!");
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-[#F3F7ED] flex items-center justify-center">
          <div className="text-xl text-green-700 font-semibold animate-pulse">Loading Profile...</div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#F3F7ED]">
        <ProfileHeader />

        <div className="flex flex-col md:flex-row">
          <SideBar onLogout={() => {
            localStorage.removeItem("accessToken");
            navigate("/login");
          }} />

          <div className="flex-1 px-4 md:px-6 py-8">
            <div className="w-full max-w-5xl mx-auto mb-8">
              {/* TABS HEADER */}
              <div className="flex items-center border-b border-gray-300">
                <button
                  onClick={() => setActiveTab("profile")}
                  className="relative flex-1 md:flex-none md:px-10 py-4 group"
                >
                  <div className={`flex items-center justify-center gap-2 text-lg transition-colors ${activeTab === "profile" ? "text-green-600 font-bold" : "text-gray-500 group-hover:text-green-600"}`}>
                    <User size={20} />
                    <span className="hidden md:inline">Update Profile</span>
                    <span className="md:hidden">Profile</span>
                  </div>
                  {activeTab === "profile" && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-green-600 rounded-t-full"></div>}
                </button>

                <div className="h-6 w-[1px] bg-gray-300 mx-2 hidden md:block"></div>

                <button
                  onClick={() => setActiveTab("payment")}
                  className="relative flex-1 md:flex-none md:px-10 py-4 group"
                >
                  <div className={`flex items-center justify-center gap-2 text-lg transition-colors ${activeTab === "payment" ? "text-green-600 font-bold" : "text-gray-500 group-hover:text-green-600"}`}>
                    <CreditCard size={20} />
                    <span className="hidden md:inline">Payment Method</span>
                    <span className="md:hidden">Payment</span>
                  </div>
                  {activeTab === "payment" && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-green-600 rounded-t-full"></div>}
                </button>

                <div className="h-6 w-[1px] bg-gray-300 mx-2 hidden md:block"></div>

                <button
                  onClick={() => setActiveTab("address")}
                  className="relative flex-1 md:flex-none md:px-10 py-4 group"
                >
                  <div className={`flex items-center justify-center gap-2 text-lg transition-colors ${activeTab === "address" ? "text-green-600 font-bold" : "text-gray-500 group-hover:text-green-600"}`}>
                    <MapPin size={20} />
                    Address
                  </div>
                  {activeTab === "address" && <div className="absolute bottom-0 left-0 w-full h-[3px] bg-green-600 rounded-t-full"></div>}
                </button>
              </div>
            </div>

            <div className="w-full max-w-5xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-sm border border-gray-100 min-h-[500px]">

              {/* PROFILE TAB */}
              {activeTab === "profile" && (
                <form onSubmit={(e) => e.preventDefault()} className="animate-fadeIn">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-[#374151]">Personal Information</h2>
                    <button
                      onClick={handleSave}
                      disabled={!hasChanges}
                      className={`px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition shadow-sm ${hasChanges ? "bg-[#7dac8c] hover:bg-[#6b967a] text-white cursor-pointer" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                    >
                      <Save size={18} /> Save Changes
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-10">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">Full Name</span>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:border-green-600 outline-none text-gray-700 bg-gray-50/50"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">Phone Number</span>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:border-green-600 outline-none text-gray-700 bg-gray-50/50"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5 md:col-span-2">
                      <span className="text-sm font-semibold text-gray-700">Email Address</span>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={profileData.email}
                          readOnly
                          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 text-gray-500 bg-gray-200 cursor-not-allowed"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-200 my-8" />
                  <h2 className="text-xl font-bold text-[#374151] mb-6 flex items-center gap-2">
                    <Lock size={20} className="text-green-600" /> Security & Password
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">Current Password</span>
                      <div className="relative">
                        <input
                          type={showCurrentPass ? "text" : "password"}
                          name="currentPassword"
                          value={profileData.currentPassword}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-green-600 outline-none text-gray-700 bg-gray-50/50"
                        />
                        <button type="button" onClick={() => setShowCurrentPass(!showCurrentPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          {showCurrentPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="hidden md:block"></div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">New Password</span>
                      <div className="relative">
                        <input
                          type={showNewPass ? "text" : "password"}
                          name="newPassword"
                          value={profileData.newPassword}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-green-600 outline-none text-gray-700 bg-gray-50/50"
                        />
                        <button type="button" onClick={() => setShowNewPass(!showNewPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                          {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-sm font-semibold text-gray-700">Confirm New Password</span>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={profileData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-green-600 outline-none text-gray-700 bg-gray-50/50"
                      />
                    </div>
                  </div>
                </form>
              )}

              {/* ADDRESS TAB - Đã xóa vòng lặp, chỉ hiện 1 address từ API */}
              {activeTab === "address" && (
                <div className="animate-fadeIn">
                  <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-semibold text-[#374151]">My Address</h2>
                    <button className="flex items-center gap-2 bg-[#7dac8c] hover:bg-[#6b967a] text-white px-4 py-2 rounded-lg transition shadow-sm">
                      <Plus size={18} /> Add new Address
                    </button>
                  </div>

                  <div className="border border-green-500 rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50/30">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-4">
                        <p className="font-semibold text-lg text-[#374151]">{profileData.fullName}</p>
                        <div className="h-4 w-[1px] bg-gray-400"></div>
                        <p className="text-gray-600">{profileData.phone}</p>
                      </div>
                      <p className="text-gray-700 mt-2 leading-relaxed">
                        {profileData.address}
                      </p>
                      <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold bg-green-100 text-green-700 border border-green-200 rounded">
                        Default
                      </span>
                    </div>

                    <div className="flex flex-row md:flex-col justify-end md:justify-between items-center md:items-end gap-3">
                      <div className="flex gap-4">
                        <button className="text-green-700 font-medium hover:underline">Update</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAYMENT TAB */}
              {activeTab === "payment" && (
                <div className="flex flex-col items-center justify-center py-20 animate-fadeIn text-center">
                  <div className="bg-gray-100 p-6 rounded-full mb-4">
                    <CreditCard size={48} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-700">No Payment Methods</h3>
                  <p className="text-gray-500 mt-2 max-w-sm">You haven't saved any payment methods yet.</p>
                  <button className="mt-6 bg-[#7dac8c] text-white px-6 py-2 rounded-lg flex items-center gap-2">
                    <Plus size={18} /> Add Payment Method
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <InfoApp />
      <Footer />
    </>
  );
}