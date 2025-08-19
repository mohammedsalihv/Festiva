import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";

export const startBooking = async (data: any) => {
  const response = await axiosInstance.post(
    USER_API.bookingRoutes.createBooking,
    data
  );
  return response.data.data;
};
