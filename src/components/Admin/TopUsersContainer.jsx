import { useEffect, useState } from "react";
import { customerApi } from "../../api/customerDashboardApi";
import { mapTopSellingCustomers } from "../../utils/customerMapper";
import TopUsersTable from "./TopUsersTable";

export default function TopUsersContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const res = await customerApi.getTopSelling();
        const mappedUsers = mapTopSellingCustomers(res.data.data, 5);
        setUsers(mappedUsers);
      } catch (err) {
        console.error("Failed to load top users", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopUsers();
  }, []);

  if (loading) return <div className="bg-white p-6 rounded-xl">Loading...</div>;

  return <TopUsersTable users={users} />;
}
