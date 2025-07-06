import axiosInstance from "@/config/user/userServiceAxiosInstence";
import { filterParams , sortParams } from "@/utils/Types/user/filterSortTypes";

export const fetchAssetDetails = async (
  type: "venue" | "studio" | "rentcar" | "caters",
  Id: string
) => {
  const response = await axiosInstance.get(
    `/asset/details/?assetId=${Id}&assetType=${type}`
  );
  return response.data.data;
};

export const filterAsset = async (type: string, filters: filterParams) => {
  const response = await axiosInstance.get(`/assets/filter/${type}`, {
    params: filters,
  });
  return response.data.data;
};


export const sortAssets = async (type: string, sorts: sortParams) => {
  const response = await axiosInstance.get(`/assets/sort/${type}`, {
    params: sorts,
  });
  return response.data.data;
};
