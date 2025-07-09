import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";

export const getRentcars = async () => {
  const response = await axiosInstance.get(USER_API.rentcarService.getRentcars);
  return response.data.data;
};
