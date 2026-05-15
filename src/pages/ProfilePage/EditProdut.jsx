import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Header from "@/components/HomePage/Header";
import ProfileHeader from "@/components/Profile/ProfileHeader";
import SideBar from "@/components/Profile/SideBar";
import Footer from "@/components/HomePage/Footer";

import { productApi, categoryApi } from "@/api/authApi";

export default function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("/no-image.png");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Load categories và product song song
        const [cateRes, productRes] = await Promise.all([
          categoryApi.getListCategories(),
          productApi.getById(id),
        ]);

        const categoriesData = cateRes.data?.data || cateRes.data || [];
        const product = productRes.data?.data || productRes.data;

        setCategories(categoriesData);

        setProductName(product.name || "");
        setDescription(product.description || "");
        setPrice(product.price || "");

        setPreviewUrl(
          product.imagePublicUrl || product.images?.[0]?.url || "/no-image.png"
        );

        // Chọn category cũ
        const foundCategory = categoriesData.find(
          (c) => c._id === product.category?._id
        );
        setSelectedCategoryId(foundCategory?._id || "");

        setLoading(false);
      } catch (err) {
        console.error("❌ Load edit product error:", err);
        alert("Failed to load product");
        navigate("/my-listing");
      }
    };

    fetchData();
  }, [id, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    if (!productName || !description || !price || !selectedCategoryId) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", selectedCategoryId);
      formData.append("status", "active");

      if (imageFile) formData.append("image", imageFile);

      await productApi.update(id, formData);

      alert("✅ Product updated successfully!");
      navigate("/my-listing");
    } catch (err) {
      console.error("❌ Update product error:", err);
      alert(err.response?.data?.message || "Failed to update product");
    }
  };

  const handleCancel = () => navigate("/my-listing");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F3F7ED]">
        <div className="text-green-700 font-medium text-lg animate-pulse">
          Loading product...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F3F7ED] min-w-full">
      <Header />
      <div className="min-h-screen bg-[#F3F7ED]">
        <ProfileHeader />
        <div className="flex flex-col md:flex-row">
          <SideBar />
          <div className="max-w-[1440px] w-full pt-10 px-4 md:px-10 mx-auto mb-8">
            <h1 className="text-2xl font-bold mb-8">Edit Product</h1>
            <div className="flex flex-col lg:flex-row gap-8">
              {/* LEFT */}
              <div className="flex-1 bg-white rounded-lg border shadow-sm">
                <div className="p-7 space-y-6">
                  <div>
                    <label className="text-sm font-medium">Product Name *</label>
                    <input
                      className="w-full mt-2 h-10 px-4 border rounded"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Description *</label>
                    <textarea
                      className="w-full mt-2 h-24 px-4 py-2 border rounded resize-none"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>

                <div className="border-t" />

                <div className="p-7">
                  <label className="text-sm font-medium">Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="block mt-3"
                  />
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="preview"
                      className="mt-4 h-32 w-32 object-cover rounded-lg border"
                    />
                  )}
                </div>

                <div className="border-t" />

                <div className="p-7">
                  <label className="text-sm font-medium">Price *</label>
                  <input
                    type="number"
                    className="w-40 mt-2 h-10 px-4 border rounded"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="lg:w-[350px] space-y-6">
                <div className="bg-white rounded-lg border p-7">
                  <h2 className="font-bold mb-4">Category *</h2>
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {categories.map((cat) => (
                      <label key={cat._id} className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={selectedCategoryId === cat._id}
                          onChange={() => setSelectedCategoryId(cat._id)}
                        />
                        <span>{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    className="flex-1 h-12 bg-[#8DCE76] text-white font-bold rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex-1 h-12 border rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
