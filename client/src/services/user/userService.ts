import axiosInstance from "@/config/user/userAxiosInstence";
import { AxiosError } from "axios";

export const changeProfile = async (userId : string , formData: FormData) => {
  try {
    console.log(formData , userId);
    const response = await axiosInstance.put(`/changeprofile/${userId}`, formData);
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
