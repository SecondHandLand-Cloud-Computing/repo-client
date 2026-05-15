import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import bgBanner from "../../../assets/images/bgtd.png";
import { categoryApi } from "../../../api/authApi";

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryApi.getListCategories();

        console.log("📦 FULL API RESPONSE:", res);
        console.log("📦 res.data:", res.data);
        console.log("📦 res.data.data:", res.data?.data);

        // Chuẩn hoá data: đảm bảo luôn là array
        const list = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
            ? res.data
            : [];

        setCategories(list);
      } catch (err) {
        console.error("❌ Failed to fetch categories:", err);
        setError("Không tải được danh mục.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // =======================
  // UI STATES
  // =======================
  if (loading) {
    return <p className="text-center mt-12 text-gray-500 text-lg">Đang tải danh mục...</p>;
  }

  if (error) {
    return <p className="text-center mt-12 text-red-500 text-lg">{error}</p>;
  }

  if (!categories.length) {
    return <p className="text-center mt-12 text-gray-400 text-lg">Chưa có danh mục nào</p>;
  }

  // =======================
  // RENDER GRID
  // =======================
  return (
    <section className="w-full">
      {/* Banner */}
      <div
        className="w-full h-24 flex items-center justify-center
                   mt-[50px] mb-[50px]
                   bg-cover bg-center
                   text-4xl text-[#283645] font-semibold"
        style={{ backgroundImage: `url(${bgBanner})` }}
      >
        <i>Shop by Category</i>
      </div>

      {/* Grid */}
      <div className="w-full max-w-8xl mx-auto px-4 mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {categories.map((c, index) => {
            // Sử dụng signed URL trực tiếp từ API
            const imageUrl = c.imagePublicUrl || "/no-image.png";

            console.log(`🟢 CATEGORY[${index}] name:`, c.name);
            console.log(`🖼️ CATEGORY[${index}] imagePublicId:`, c.imagePublicId);
            console.log(`🌐 CATEGORY[${index}] final image URL:`, imageUrl);

            return (
              <CategoryCard
                key={c._id || index}
                name={c.name || "Danh mục"}
                category={c.slug || c._id || ""}
                img={imageUrl}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
