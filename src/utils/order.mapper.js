const STATUS_UI = {
  pending: {
    label: "Pending",
    className: "bg-orange-50 text-orange-700 border-orange-100",
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 border-blue-100",
  },
  shipping: {
    label: "Shipping",
    className: "bg-purple-50 text-purple-700 border-purple-100",
  },
  completed: {
    label: "Completed",
    className: "bg-green-50 text-green-700 border-green-100",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 border-red-100",
  },
};

/**
 * Map 1 order từ API → UI-safe object
 */
export const mapOrderFromApiToUI = (order) => {
  if (!order) return null;

  const statusUI = STATUS_UI[order.status] || {
    label: order.status || "Unknown",
    className: "bg-gray-50 text-gray-700 border-gray-100",
  };

  return {
    /** ===== ORDER ===== */
    orderId: order._id,
    ownerId: order.ownerId || "-",

    /** ===== PRODUCTS (STRING ONLY) ===== */
    productIds: (order.products || []).map((p) =>
      typeof p === "string" ? p : p.name || p._id || p.id || "Unknown product"
    ),

    /** ===== DATE ===== */
    createdAt: order.createdAt,
    date: order.createdAt ? new Date(order.createdAt).toLocaleDateString("vi-VN") : "-",

    /** ===== STATUS ===== */
    status: order.status,
    statusLabel: statusUI.label,
    statusClass: statusUI.className,
  };
};

/**
 * 🔥 MAP NHIỀU ORDERS (CHUẨN HOÁ DATA)
 * - API trả 1 object → convert thành array
 * - API trả array → dùng luôn
 */
export const mapOrderListFromApiToUI = (data) => {
  if (!data) return [];

  const orders = Array.isArray(data) ? data : [data];

  return orders.map(mapOrderFromApiToUI).filter(Boolean);
};
