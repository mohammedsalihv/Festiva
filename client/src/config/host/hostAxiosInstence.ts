import axios, { AxiosInstance } from "axios";
import store from "@/redux/store";
import { setHostDetails , logoutHost } from "@/redux/Slice/host/common/hostSlice";

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL_HOST || "http://localhost:4000/api/host",
  withCredentials: true,
  timeout: 30000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("🔍 Request URL:", `${config.baseURL ?? ""}${config.url}`);
    const state = store.getState();
    const token = state.host.hostInfo?.accessToken;
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

      const state = store.getState();
      const refreshToken = state.host.hostInfo?.refreshToken;

      if (!refreshToken) {
        store.dispatch(logoutHost());
        return Promise.reject(error);
      }

      try {
        const response = await axiosInstance.post("/auth/refresh", {
          refreshToken,
        });

        const {
          accessToken,
          refreshToken: newRefreshToken,
          host,
        } = response.data;

        store.dispatch(
          setHostDetails({
            ...host,
            accessToken,
            refreshToken: newRefreshToken,
          })
        );

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutHost());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
