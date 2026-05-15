import axiosClient from "./axiosClient";

export const orderApi = {
  getList() {
    return axiosClient.get("/order/list");
  },

  getDetail(orderId) {
    return axiosClient.get(`/order/${orderId}`);
  },
};
