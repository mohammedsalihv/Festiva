import axiosInstance from "@/config/admin/adminAxiosInstence";
import { ADMIN_API } from "@/utils/constants/api endpoints/admin.api";
import {
  singleAssetResponse,
  allAssetsResponse,
  assetDetailTypes,
  assetStatusResponse,
} from "@/utils/Types/admin/assetManagement/commonAssets";

export const allAssets = async (typeOfAsset: string) => {
  const response = await axiosInstance.get<allAssetsResponse>(
    ADMIN_API.assetManagement.getAllAssets(typeOfAsset)
  );
  return response.data.data;
};

export const singleAssetDetails = async (
  assetId: string,
  typeOfAsset: string
) => {
  const response = await axiosInstance.get<singleAssetResponse<assetDetailTypes>>(
    ADMIN_API.assetManagement.getSingleAssetDetails(assetId, typeOfAsset)
  );
  return response.data.data;
};

export const assetRequestApprove = async (
  assetId: string,
  typeOfAsset: string
) => {
  const response = await axiosInstance.put<assetStatusResponse>(
    ADMIN_API.assetManagement.approveAsset(assetId, typeOfAsset)
  );
  return response.data;
};

export const assetRequestReject = async (
  assetId: string,
  typeOfAsset: string
) => {
  const response = await axiosInstance.put<assetStatusResponse>(
    ADMIN_API.assetManagement.rejectAsset(assetId, typeOfAsset)
  );
  return response.data;
};
