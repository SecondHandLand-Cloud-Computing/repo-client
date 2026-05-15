import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

// API
import { productApi, customerApi } from "@/api/authApi";

// Components
import SideBar from "@/components/Profile/SideBar.jsx";
import ProductCard from "@/components/ProductCardForMyListing";
import Header from "@/components/HomePage/Header";
import Footer from "@/components/HomePage/Footer";
import InfoApp from "@/components/HomePage/InfoApp.jsx";
import ProfileHeader from "@/components/Profile/ProfileHeader.jsx";
import mockProfileData from "@/pages/ProfilePage/ProfileData.js";

export default function MyListing() {
  const [products, setProducts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyListing = async () => {
      try {
        setLoading(true);

        // 1️⃣ USER INFO
        const userRes = await customerApi.getMe();
        const user = userRes.data?.data || userRes.data;
        setCurrentUser(user);

        // 2️⃣ MY LIST
        const productRes = await productApi.getMyList();
        const rawData = productRes.data?.data || [];

        // 3️⃣ MAP DATA (CHỈ DÙNG id)
       const mappedProducts = rawData.map((p) => ({
  id: p._id.toString(), // 👈 ép string, tránh lỗi ObjectId
  name: p.name,
  price: p.price,
  status: p.status,
  image: p.imagePublicUrl,
  description: p.description,
}));


        setProducts(mappedProducts);
      } catch (err) {
        console.error("❌ Error loading my listing:", err);
        setError("Failed to load your products.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyListing();
  }, []);

  // ✅ sync UI sau khi xoá
  const handleDeleted = (deletedId) => {
    setProducts((prev) => prev.filter((p) => p.id !== deletedId));
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#F3F7ED]">
        <ProfileHeader
          profileData={
            currentUser
              ? {
                  fullName: `${currentUser.name?.firstName || ""} ${
                    currentUser.name?.lastName || ""
                  }`,
                  email: currentUser.mail,
                  phone: currentUser.phone || "N/A",
                  address: currentUser.address || "N/A",
                }
              : mockProfileData
          }
        />

        <div className="flex flex-col md:flex-row">
          <SideBar />

          <main className="flex-1 px-4 md:px-6 py-8">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-[#243242]">
                  My Listings
                </h2>

                <Link
                  to="/my-listing/addproduct"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#8DCE76] text-white font-semibold hover:bg-opacity-90 transition shadow"
                >
                  <Plus className="h-5 w-5" />
                  Add Product
                </Link>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-6 text-red-500 font-semibold">
                  {error}
                </div>
              )}

              {/* Content */}
              {loading ? (
                <div className="flex justify-center py-20">
                  <div className="text-lg text-green-700 font-medium animate-pulse">
                    Loading your products...
                  </div>
                </div>
              ) : products.length > 0 ? (
                <div className="space-y-6">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onDeleted={handleDeleted}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl p-20 text-center shadow-sm border">
                  <p className="text-gray-500 text-lg">
                    You haven't listed any products yet.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <InfoApp />
      <Footer />
    </>
  );
}
