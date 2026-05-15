import axiosClient from "./axiosClient";

export const categoryApi = {
  getList: () => axiosClient.get("/category/top-selling"),

  create: (formData) =>
    axiosClient.post("/category", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id, payload) => axiosClient.put(`/category/${id}`, payload),
};

export default categoryApi;
