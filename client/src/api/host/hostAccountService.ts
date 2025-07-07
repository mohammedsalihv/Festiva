import axiosInstance from "@/config/host/hostAccountAxiosInstence";

export const allNotification = async () => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};


export const getAllAssetRequests = async () => {
  const response = await axiosInstance.get("/requests");
  return response.data;
};
