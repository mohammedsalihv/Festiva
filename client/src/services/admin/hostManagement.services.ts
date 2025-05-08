import axiosInstance from "@/config/admin/adminAxiosInstence";
import { AxiosError } from "axios";
import { Host } from "@/utils/types";

interface GetHostsResponse {
  data: Host[];
  message: string;
  success: boolean;
}

export const getAllHosts = async () => {
  try {
    const response = await axiosInstance.get<GetHostsResponse>("/getAllHosts");
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    } else {
      console.error(
        "Fetching hosts list failed:",
        (error as Error).message || "Unknown error"
      );
      throw error;
    }
  }
};
