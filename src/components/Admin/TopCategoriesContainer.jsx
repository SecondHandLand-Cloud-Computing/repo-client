import { useEffect, useState } from "react";
import { categoryDashboardApi } from "../../api/categoryDashboardApi";
import { mapTopSellingCategories } from "../../utils/categoryMapper";
import TopCategoriesList from "./TopCategoriesList";

export default function TopCategoriesContainer() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopCategories = async () => {
      try {
        const res = await categoryDashboardApi.getTopSelling();
        const mapped = mapTopSellingCategories(res.data.data, 5);
        setCategories(mapped);
      } catch (err) {
        console.error("Failed to fetch top categories", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopCategories();
  }, []);

  if (loading) {
    return <div className="bg-white p-6 rounded-xl">Loading...</div>;
  }

  return <TopCategoriesList categories={categories} />;
}
