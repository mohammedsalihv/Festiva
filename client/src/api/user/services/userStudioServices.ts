import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";

export const getStudios = async () => {
  const response = await axiosInstance.get(USER_API.studioService.getStudios);
  return response.data.data;
};