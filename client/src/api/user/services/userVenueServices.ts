import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";

export const getVenues = async () => {
  const response = await axiosInstance.get(USER_API.venueService.getVenues);
  return response.data.data;
};