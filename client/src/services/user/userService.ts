import axiosInstance from "@/config/user/userAxiosInstence";
import { AxiosError } from "axios";

export const changeProfile = async (userId: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(`/changeprofile/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Change profile photo failed:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Failed to update profile");
    }
    throw new Error("Failed to update profile");
  }
};