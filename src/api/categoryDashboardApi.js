import axiosClient from "./axiosClient";

export const categoryDashboardApi = {
  getTopSelling: () => axiosClient.get("/category/top-selling"),
};

export default categoryDashboardApi;
