import axiosInstance from "@/config/admin/adminAxiosInstence";
import { GetServicesResponse } from "@/utils/Types/admin/serviceManagementTypes";

export const Assets = async (typeOfAsset:string) => {
  const response = await axiosInstance.get<GetServicesResponse>(`/assets/${typeOfAsset}`);
  return response.data.data;
};
