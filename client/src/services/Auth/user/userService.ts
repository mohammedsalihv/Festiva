import axiosInstance from "@/config/useraxiosInstence";
import { AxiosError } from "axios";

export const changeProfile = async (formData: FormData) => {
  try {
    const response = await axiosInstance.put("/changeprofile", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Change profile photo failed:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
};
