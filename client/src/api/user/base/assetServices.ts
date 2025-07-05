import axiosInstance from "@/config/user/userServiceAxiosInstence";

export const fetchAssetDetails = async (
  type: "venue" | "studio" | "rentcar" | "caters",
  Id: string
) => {
  const response = await axiosInstance.get(
    `/asset/details/?assetId=${Id}&assetType=${type}`
  );
  return response.data.data;
};

export const filterAsset = async (type: string, filters: FilterParams) => {
  const response = await axiosInstance.get(`/assets/${type}`, {
    params: filters,
  });
  return response.data.data;
};
