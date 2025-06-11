import axiosInstance from "@/config/admin/adminAxiosInstence";
import {
  GetServicesResponse,
  assetStatusResponse,
} from "@/utils/Types/admin/assetManagement/commonAssets";

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

export const assetRequestApprove = async (
  assetId: string,
  typeOfAsset: string
) => {
  const response = await axiosInstance.put<assetStatusResponse>(
    `/assets/approve/${assetId}?assetStatus=approved&type=${typeOfAsset}`
  );
  return response.data;
};

export const assetRequestReject = async (
  assetId: string,
  typeOfAsset: string
) => {
  const response = await axiosInstance.put<assetStatusResponse>(
    `/assets/reject/${assetId}?assetStatus=rejected&type=${typeOfAsset}`
  );
  return response.data;
};
