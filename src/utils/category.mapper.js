import { CLOUDINARY_BASE_URL } from "@/constants/cloudinary";

export const mapCategoryListFromApiToUI = (categories = []) =>
  categories.map((c, index) => ({
    id: c._id ?? `category-${index}`,
    name: c.name ?? "",
    description: c.description ?? "",
    revenue: c.totalRevenue ?? 0,
    soldCount: c.soldCount,
    image: c.imagePublicId ? `${CLOUDINARY_BASE_URL}/${c.imagePublicId}` : "",
  }));
