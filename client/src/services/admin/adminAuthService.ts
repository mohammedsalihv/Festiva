import axiosInstance from "@/config/admin/adminAuthAxiosInstence";

export interface AdminLoginData {
    email: string;
    password: string;
  }
  


export const adminLogin = async (data: AdminLoginData) => {
    try {
      const response = await axiosInstance.post("/auth/login-admin", data);
      return response.data;
    } catch (error: any) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    }
  };
  