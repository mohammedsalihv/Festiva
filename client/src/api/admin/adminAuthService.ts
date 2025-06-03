import axiosInstance from "@/config/admin/adminAxiosInstence";
export interface AdminLoginData {
  email: string;
  password: string;
}

export const adminLogin = async (data: AdminLoginData) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
