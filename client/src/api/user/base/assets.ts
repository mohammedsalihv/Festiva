import axiosInstance from "@/config/user/userAxiosInstence";

export const fetchAssetDetails = async (
  type: "venue" | "studio" | "rentcar" | "caters",
  id: string
) => {
  const response = await axiosInstance.get(
    `/asset/details/?assetId=${id}&type=${type}`
  );
  return response.data.data;
};
