// src/api/productApi.js
import axiosClient from "./axiosClient";

const productApi = {
  getList: ({ page = 1, limit = 8, search = "" }) =>
    axiosClient.get("/product/list", {
      params: { page, limit, search },
    }),

  updateStatus: ({ id, status }) => {
    const formData = new FormData();
    formData.append("status", status);

    formData.append("deletedImages", JSON.stringify([]));

    return axiosClient.put(`/product/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default productApi;
