import { useEffect, useMemo, useState } from "react";
import { orderApi } from "@/api/orderApi";
import { mapOrderListFromApiToUI } from "@/utils/order.mapper";

export default function useOrder({ pageSize = 8 } = {}) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await orderApi.getList();

        // 🛡 normalize data
        const rawData = res?.data?.data;

        const mappedOrders = mapOrderListFromApiToUI(rawData);

        setOrders(mappedOrders);
      } catch (err) {
        console.error("❌ Fetch orders failed:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ================= FILTER ================= */
  const filteredOrders = useMemo(() => {
    if (!searchTerm) return orders;

    const keyword = searchTerm.toLowerCase();

    return orders.filter((o) =>
      String(o.orderId || "")
        .toLowerCase()
        .includes(keyword)
    );
  }, [orders, searchTerm]);

  /* ================= PAGINATION ================= */
  const totalOrders = filteredOrders.length;

  const totalPages = Math.max(1, Math.ceil(totalOrders / pageSize));

  const pagedOrders = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredOrders.slice(start, start + pageSize);
  }, [filteredOrders, page, pageSize]);

  /* ================= RESET PAGE ON SEARCH ================= */
  useEffect(() => {
    setPage(1);
  }, [searchTerm]);

  return {
    loading,

    // data
    orders: pagedOrders,
    totalOrders,
    totalPages,

    // state
    page,
    setPage,
    searchTerm,
    setSearchTerm,
  };
}
