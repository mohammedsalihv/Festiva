import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";

export const startBooking = async (formData: FormData) => {
  const response = await axiosInstance.post(
    USER_API.bookingRoutes.createBooking,
    formData
  );
  return response.data.data;
};
