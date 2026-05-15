// src/hooks/useOrderDetail.js
import { useEffect, useState } from "react";
import { orderApi } from "@/api/orderApi";

export default function useOrderDetail(orderId) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        const res = await orderApi.getById(orderId);
        setOrder(res.data.data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  return { order, loading };
}
