import axiosClient from "./axiosClient";

export const dashboardApi = {
  // Top khách hàng mua nhiều nhất
  getTopSellingCustomers: () => axiosClient.get("/customer/top-selling"),

  // Top category bán chạy
  getTopSellingCategories: () => axiosClient.get("/category/top-selling"),
};
