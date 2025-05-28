import axiosInstance from "@/config/admin/adminAxiosInstence";
import { AxiosError } from "axios";
import { GetServicesResponse } from "@/utils/Types/admin/serviceManagementTypes";

export const AllServices = async () => {
  try {
    const response = await axiosInstance.get<GetServicesResponse>("/services");
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Fetching failed:", error.response?.data || error.message);
      throw error;
    } else {
      console.error(
        "Fetching services failed:",
        (error as Error).message || "Unknown error"
      );
      throw error;
    }
  }
};
