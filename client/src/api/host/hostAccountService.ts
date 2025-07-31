import axiosInstance from "@/config/host/hostAccountAxiosInstence";
import { HOST_API } from "@/utils/constants/api endpoints/host.api";

export const allNotification = async () => {
  const response = await axiosInstance.get(HOST_API.hostAccount.notifications);
  return response.data;
};

export const markAllNotificationsAsRead = async () => {
  const response = await axiosInstance.patch(
    HOST_API.hostAccount.markAllReadNotifications
  );
  return response.data;
};

export const myAssets = async (page: number, limit: number) => {
  const response = await axiosInstance.get(HOST_API.hostAccount.myAssets, {
    params: { page, limit },
  });

  return response.data;
};

export const fetchAssetDetails = async (assetId: string, assetType: string) => {
  const response = await axiosInstance.get(
    HOST_API.hostAccount.assetFullDetails(assetId),
    {
      params: { type: assetType },
    }
  );
  return response.data;
};

export const getAllAssetRequests = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get(HOST_API.hostAccount.requets, {
    params: { page, limit },
  });

  return response.data;
};

export const assetReApply = async (assetId: string, assetType: string) => {
  const response = await axiosInstance.patch(
    HOST_API.hostAccount.assetReApplying(assetId),
    {},
    {
      params: { type: assetType },
    }
  );
  return response.data;
};


export const updateAssetAvailability = async (
  assetId: string,
  assetType: string,
  status: "available" | "unavailable"
) => {
  const response = await axiosInstance.patch(
    HOST_API.hostAccount.updateAvailability(assetId, status),
    {},
    {
      params: { type: assetType },
    }
  );
  return response.data;
};


export const assetDelete = async (assetId: string, assetType: string) => {
  const response = await axiosInstance.delete(
    HOST_API.hostAccount.assetDelete(assetId),
    {
      params: { type: assetType },
    }
  );
  return response.data;
};

