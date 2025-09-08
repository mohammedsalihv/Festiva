import axiosInstance from "@/config/admin/adminAxiosInstence";
import { ADMIN_API } from "@/utils/constants/api endpoints/admin.api";

export const getDashboard = async () => {
  const response = await axiosInstance.get(ADMIN_API.adminDashboard.dashboard);
  return response.data;
};
