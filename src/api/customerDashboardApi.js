import axiosClient from "./axiosClient";

export const customerApi = {
  // Get top 10 selling customers
  getTopSelling: () => axiosClient.get("/customer/top-selling"),
};

export default customerApi;
