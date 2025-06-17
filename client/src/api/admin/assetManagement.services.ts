import axiosInstance from "@/config/admin/adminAxiosInstence";
import {
  singleAssetResponse,
  allAssetsResponse,
  assetDetailTypes,
  assetStatusResponse,
} from "@/utils/Types/admin/assetManagement/commonAssets";

export const allAssets = async (typeOfAsset: string) => {
  const response = await axiosInstance.get<allAssetsResponse>(
    `/assets/${typeOfAsset}`
  );
  return response.data.data;
};

export const singleAssetDetails = async (assetId: string, typeOfAsset: string) => {
  const response = await axiosInstance.get<
    singleAssetResponse<assetDetailTypes>
  >(`/assets/details/${assetId}?type=${typeOfAsset}`);
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
