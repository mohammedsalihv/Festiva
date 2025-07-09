import axiosInstance from "@/config/user/userServiceAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";
import { filterParams, sortParams } from "@/utils/Types/user/filterSortTypes";

export const fetchAssetDetails = async (
  type: "venue" | "studio" | "rentcar" | "caters",
  Id: string
) => {
  const response = await axiosInstance.get(
    USER_API.userAssets.getAssetDetails(Id, type)
  );
  return response.data.data;
};

export const filterAsset = async (
  type: string,
  filters: filterParams & { page?: number; limit?: number }
): Promise<{ data: any[]; totalPages: number; currentPage: number }> => {
  const response = await axiosInstance.get(
    USER_API.userAssets.filterAssets(type),
    {
      params: filters,
    }
  );
  return response.data;
};

export const sortAssets = async (
  type: string,
  sorts: sortParams & { page?: number; limit?: number }
): Promise<{ data: any[]; totalPages: number; currentPage: number }> => {
  const response = await axiosInstance.get(
    USER_API.userAssets.sortAssets(type),
    {
      params: sorts,
    }
  );
  return response.data;
};
