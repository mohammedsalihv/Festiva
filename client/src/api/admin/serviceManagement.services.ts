import axiosInstance from "@/config/admin/adminAxiosInstence";
import { GetServicesResponse } from "@/utils/Types/admin/serviceManagementTypes";

export const AllServices = async () => {
  const response = await axiosInstance.get<GetServicesResponse>("/services");
  return response.data.data;
};
