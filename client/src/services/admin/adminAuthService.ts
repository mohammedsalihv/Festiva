import axiosInstance from "@/config/admin/adminAxiosInstence";
import { AxiosError } from "axios";
export interface AdminLoginData {
  email: string;
  password: string;
}

export const adminLogin = async (data: AdminLoginData) => {
  try {
    const response = await axiosInstance.post("/auth/login-admin", data);
    console.log(response);
    
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    } else {
      console.error(
        "Login failed:",
        (error as Error).message || "Unknown error"
      );
      throw error;
    }
  }
};
