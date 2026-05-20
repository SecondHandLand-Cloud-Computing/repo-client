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
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

console.log("🚀 API BaseURL:", axiosClient.defaults.baseURL);

// Request interceptor: Tự động đính Token vào Header mỗi khi gọi API
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Lưu Token vào localStorage khi đăng nhập/đăng ký thành công
axiosClient.interceptors.response.use(
  (response) => {
    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  },
  (error) => {
    // Nếu bị 401 (hết hạn token), có thể xóa token cũ
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
