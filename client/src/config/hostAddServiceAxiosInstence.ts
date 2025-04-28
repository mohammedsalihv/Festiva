import axios, { AxiosInstance } from "axios";
import store from "@/redux/store";
import { setVenueDetails } from "@/redux/Slice/host/venueDetailsSlice";
import { setLocationDetails } from "@/redux/Slice/host/locationSlice";
import { setAllLocationFeatures } from "@/redux/Slice/host/locationFeaturesSlice";
import { setAllImages } from "@/redux/Slice/host/imageSlice";
import { initialVenueDetailsState } from "@/redux/Slice/host/venueDetailsSlice";
import { initialLocationDetailsState } from "@/redux/Slice/host/locationSlice";
import { initialLocationFeaturesState } from "@/redux/Slice/host/locationFeaturesSlice";
import { initialImageState } from "@/redux/Slice/host/imageSlice";

const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_BASE_URL_HOST || "http://localhost:4000/api/host",
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("🔍 Request URL:", `${config.baseURL ?? ""}${config.url}`);
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
        store.dispatch(setVenueDetails(initialVenueDetailsState));
        store.dispatch(setLocationDetails(initialLocationDetailsState));
        store.dispatch(setAllLocationFeatures(initialLocationFeaturesState));
        store.dispatch(setAllImages(initialImageState.croppedImages));

        return axiosInstance(originalRequest);
      } catch (err) {
        console.error("Error resetting state after 401:", err);
        return Promise.reject(err);
      }
    }

    console.error("Axios response error:", error.response);
    return Promise.reject(error);
  }
);

export default axiosInstance;
