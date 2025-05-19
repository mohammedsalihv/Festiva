import axios, { AxiosInstance } from "axios";
import store from "@/redux/store";
import { setAdminDetails , logoutAdmin } from "@/redux/Slice/admin/adminSlice";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_ADMIN || "http://localhost:4000/api/admin", 
    withCredentials: true,
    timeout: 10000,
  });

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.admin.adminInfo?.accessToken;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const state = store.getState();
        const refreshToken = state.admin.adminInfo?.refreshToken;

        if (!refreshToken) {
          store.dispatch(logoutAdmin());
          return Promise.reject(error);
        }

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/auth/refresh`,
          { refreshToken }
        );

        const {
          accessToken,
          refreshToken: newRefreshToken,
          admin,
        } = response.data;
        store.dispatch(
          setAdminDetails({
            ...admin,
            accessToken,
            refreshToken: newRefreshToken,
          })
        );
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutAdmin());
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
