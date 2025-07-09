import axiosInstance from "@/config/host/hostAccountAxiosInstence";
import { HOST_API } from "@/utils/constants/api endpoints/host.api";

export const allNotification = async () => {
  const response = await axiosInstance.get(HOST_API.hostAccount.notifications);
  return response.data;
};

export const getAllAssetRequests = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(HOST_API.hostAccount.requets, {
    params: { page, limit },
  });

  return response.data;
};
