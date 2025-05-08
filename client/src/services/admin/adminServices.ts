import axiosInstance from "@/config/admin/adminAuthAxiosInstence";
import { AxiosError } from "axios";
import { User , Host} from "@/utils/types";


interface GetUsersResponse {
  data: User[];
  message: string;
  success: boolean;
}

interface GetHostsResponse {
  data: Host[];
  message: string;
  success: boolean;
}



export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get<GetUsersResponse>("/getAllUsers");
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    } else {
      console.error(
        "Fetching users list failed:",
        (error as Error).message || "Unknown error"
      );
      throw error;
    }
  }
};

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