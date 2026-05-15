export const getCloudinaryImage = (publicId) => {
  // 1️⃣ Không có ảnh
  if (!publicId || typeof publicId !== "string") {
    return "/no-image.png";
  }

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.error("❌ Missing VITE_CLOUDINARY_CLOUD_NAME");
    return "/no-image.png";
  }

  let cleanId = publicId.trim();

  // 2️⃣ Nếu đã là full URL (Cloudinary hoặc CDN khác)
  if (cleanId.startsWith("http://") || cleanId.startsWith("https://")) {
    return cleanId;
  }

  // 3️⃣ Bỏ slash đầu
  cleanId = cleanId.replace(/^\/+/, "");

  // 4️⃣ Nếu lỡ lưu cả image/upload/v123/
  cleanId = cleanId.replace(/^image\/upload\/v\d+\//, "");

  // 5️⃣ Nếu lỡ lưu có version
  cleanId = cleanId.replace(/^v\d+\//, "");

  // 6️⃣ Bỏ extension (Cloudinary KHÔNG cần)
  cleanId = cleanId.replace(/\.(jpg|jpeg|png|webp|avif)$/i, "");

  // 7️⃣ Bỏ query string nếu có
  cleanId = cleanId.split("?")[0];

  // 8️⃣ Vẫn rỗng → fallback
  if (!cleanId) {
    return "/no-image.png";
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${cleanId}`;
};
