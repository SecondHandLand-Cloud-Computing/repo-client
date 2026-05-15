// import axios from "axios";

// const axiosClient = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
//   timeout: Number(import.meta.env.VITE_API_TIMEOUT) || 10000,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// axiosClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message =
//       error.response?.data?.message || error.message || "Network error — please check connection";
//     return Promise.reject({ message, status: error.response?.status });
//   }
// );

// export default axiosClient;

import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

export default axiosClient;
