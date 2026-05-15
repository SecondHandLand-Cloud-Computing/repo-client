import React, { useState, useEffect } from "react";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import InfoApp from "../../components/HomePage/InfoApp";
import SideBar from "@/components/Profile/SideBar";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import HistoryList from "@/components/Profile/HistoryList";
import axios from "axios";

export default function ProfileHistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCH ORDER HISTORY ---
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setIsLoading(true);
        // Gọi API dựa trên route bạn đã cung cấp
        // Lưu ý: requireAuth thường yêu cầu gửi kèm Token trong Cookie hoặc Header
        const response = await axios.get("/api/order/order-history");
        console.log(response);
        const orders = response.data.data || response.data;

        const formattedOrders = orders.map((order) => ({
          id: order._id, // hoặc order.id
          title: order.productName || "Product Name", // Tùy vào Model Order của bạn
          shop: order.shopName || "Unknown Shop",
          price: order.totalPrice || 0,
          image: order.productImage || "https://via.placeholder.com/150",
          status: order.status, // Có thể dùng để hiển thị trạng thái đơn hàng
          createdAt: order.createdAt
        }));

        setHistoryData(formattedOrders);
      } catch (error) {
        console.error("Failed to fetch order history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-[#F3F7ED]">
        {/* ProfileHeader sẽ tự fetch dữ liệu của nó như bạn đã code trước đó */}
        <ProfileHeader />

        <div className="flex flex-col md:flex-row">
          <SideBar/>

          <main className="flex-1 px-4 md:px-6 py-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-[#243242] mb-6">Order History</h2>

              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="text-lg text-green-700 font-medium animate-pulse">
                    Loading orders...
                  </div>
                </div>
              ) : historyData.length > 0 ? (
                <HistoryList data={historyData} />
              ) : (
                <div className="bg-white rounded-xl p-20 text-center shadow-sm border border-gray-100">
                  <p className="text-gray-500 text-lg">You haven't placed any orders yet.</p>
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