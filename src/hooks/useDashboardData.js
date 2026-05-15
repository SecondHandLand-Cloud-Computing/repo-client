import { useEffect, useState } from "react";
import { dashboardApi } from "../../api/dashboard.api";

export default function useDashboardData() {
  const [topUsers, setTopUsers] = useState([]);
  const [topCategories, setTopCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const [usersRes, categoriesRes] = await Promise.all([
          dashboardApi.getTopSellingCustomers(),
          dashboardApi.getTopSellingCategories(),
        ]);

        setTopUsers(usersRes.data.data || []);

        setTopCategories(categoriesRes.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Không thể tải dữ liệu dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return {
    topUsers,
    topCategories,
    loading,
    error,
  };
}
