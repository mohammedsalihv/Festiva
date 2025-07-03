import axiosInstance from "@/config/user/userServiceAxiosInstence";

export const fetchAssetDetails = async (
  type: "venue" | "studio" | "rentcar" | "caters",
  id: string
) => {
  const response = await axiosInstance.get(
    `/asset/details/?assetId=${id}&type=${type}`
  );
  return response.data.data;
};
