// src/utils/mapProducts.js
import { CLOUDINARY_BASE_URL } from "@/constants/cloudinary";

export const mapProducts = (products = []) => {
  if (!Array.isArray(products)) return [];

  return products.map((p, index) => {
    const isValidCloudinaryId =
      typeof p.imagePublicId === "string" &&
      p.imagePublicId.trim() !== "" &&
      !p.imagePublicId.startsWith("images/");

    const customerName = p.createdBy?.name
      ? `${p.createdBy.name.firstName ?? ""} ${p.createdBy.name.lastName ?? ""}`.trim()
      : "Unknown";

    return {
      id: p._id ?? `product-${index}`,
      name: p.name ?? "Unknown",
      description: p.description ?? "",
      price: Number(p.price) || 0,
      status: p.status ?? "unknown",

      image: p.imagePublicUrl,
      // isValidCloudinaryId && CLOUDINARY_BASE_URL
      //   ? `${CLOUDINARY_BASE_URL}/${p.imagePublicId}`
      //   : p.imagePublicUrl || "",

      date: p.createdAt ? new Date(p.createdAt).toLocaleDateString("vi-VN") : "",

      customerId: p.createdBy?._id ?? "Unknown",
      customerName,
    };
  });
};