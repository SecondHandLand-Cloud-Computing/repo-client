export const mapTopSellingCategories = (categories = [], limit = 3) =>
  categories.slice(0, limit).map((c, index) => ({
    id: c._id ?? `category-${index}`,
    rank: index + 1,
    name: c.name ?? "Unknown",
    revenue: c.totalRevenue ?? 0,
  }));
