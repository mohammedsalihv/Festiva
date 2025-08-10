import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";

export const getCaters = async () => {
  const response = await axiosInstance.get(USER_API.catersService.getCaters);
  return response.data.data;
};

