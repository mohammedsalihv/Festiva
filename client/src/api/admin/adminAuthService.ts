import axiosInstance from "@/config/admin/adminAxiosInstence";
import { ADMIN_API } from "@/utils/constants/api endpoints/admin.api";
export interface AdminLoginData {
  email: string;
  password: string;
}

export const adminLogin = async (data: AdminLoginData) => {
  const response = await axiosInstance.post(ADMIN_API.Authentication.adminLogin, data);
  return response.data;
};
