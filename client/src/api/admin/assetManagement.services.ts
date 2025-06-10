import axiosInstance from "@/config/admin/adminAxiosInstence";
import { GetServicesResponse } from "@/utils/Types/admin/assetManagement/commonAssets";

export const Assets = async (typeOfAsset: string) => {
  const response = await axiosInstance.get<GetServicesResponse>(
    `/assets/${typeOfAsset}`
  );
  return response.data.data;
};

export const assetDetails = async (assetId: string, typeOfAsset: string) => {
  const response = await axiosInstance.get<GetServicesResponse>(
    `/assets/details/${assetId}?type=${typeOfAsset}`
  );
  return response.data.data;
};
