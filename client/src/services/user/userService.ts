import axiosInstance from "@/config/user/userAxiosInstence";
import { AxiosError } from "axios";

export const changeProfile = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put(`/setProfilePhoto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || "Failed to update profile");
    }
    throw new Error("Failed to update profile");
  }
};