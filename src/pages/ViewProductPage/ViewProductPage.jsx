import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Layout
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";

// Product components
import ProductImages from "../../components/ViewProduct/ProductImages";
import ProductInfo from "../../components/ViewProduct/ProductInfo";
import ShopOwnerCard from "../../components/ViewProduct/ShopOwnerCard";
import ProductReviews from "../../components/ViewProduct/ProductReviews";

// API
import { productApi, customerApi, reviewApi } from "../../api/authApi";

export default function ViewProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [owner, setOwner] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductAndOwner = async () => {
      try {
        setLoading(true);

        // 1️⃣ Lấy product
        const resProduct = await productApi.getById(id);
        const productData = resProduct.data?.data;
        if (!productData) return;

        setProduct({
          ...productData,
          image: productData.imagePublicUrl || "/placeholder.png", // dùng trực tiếp từ API
        });

        // 2️⃣ Lấy thông tin người bán
        const sellerId = productData.createdBy?._id;
        if (sellerId) {
          try {
            const resOwner = await customerApi.getById(sellerId);
            setOwner(resOwner.data?.data || null);
          } catch (err) {
            console.error("❌ Failed to fetch owner data:", err);
            setOwner(null);
          }
        } else {
          setOwner(null);
        }

        // 3️⃣ Lấy review của sản phẩm (hoặc của seller nếu muốn)
        try {
          const resReview = await reviewApi.getByUserId(sellerId);
          setReviews(resReview.data?.data?.reviews || []);
        } catch (err) {
          console.error("❌ Failed to fetch reviews:", err);
          setReviews([]);
        }
      } catch (err) {
        console.error("❌ Failed to load product detail", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductAndOwner();
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading product...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-[50px] py-12">
          {/* IMAGE + INFO */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <ProductImages image={product.image} />
            <ProductInfo product={product} owner={owner} />
          </section>

          {/* SHOP OWNER */}
          <ShopOwnerCard owner={owner} reviews={reviews} />

          {/* REVIEWS */}
          <ProductReviews reviews={reviews} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
