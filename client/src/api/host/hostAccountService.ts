import axiosInstance from "@/config/host/hostAccountAxiosInstence";
import { HOST_API } from "@/utils/constants/api endpoints/host.api";



export const getDashboard = async () => {
  const response = await axiosInstance.get(HOST_API.hostAccount.dashboard);
  return response.data;
};


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

export const myAssets = async (
  page: number,
  limit: number,
  search?: string,
  status?: string | string[],
  assetType?: string,
  sortBy?: "newest" | "oldest"
) => {
  const response = await axiosInstance.get(HOST_API.hostAccount.myAssets, {
    params: {
      page,
      limit,
      ...(search ? { search } : {}),
      ...(status ? { status } : {}),
      ...(assetType ? { assetType } : {}),
      ...(sortBy ? { sortBy } : {}),
    },
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

export const getAllAssetRequests = async (
  page = 1,
  limit = 10,
  search = "",
  status = "",
  sortBy = "",
  order = "",
  serviceType = ""
) => {
  const response = await axiosInstance.get(HOST_API.hostAccount.requets, {
    params: {
      page,
      limit,
      search,
      status,
      sortBy,
      order,
      serviceType,
    },
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
  isAvailable: boolean
) => {
  const response = await axiosInstance.patch(
    HOST_API.hostAccount.updateAvailability(assetId),
    { isAvailable },
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

export const allBookings = async (
  page: number,
  limit: number,
  status?: string
) => {
  const response = await axiosInstance.get(HOST_API.hostAccount.hostBookings, {
    params: {
      page,
      limit,
      status,
    },
  });
  return response.data;
};

export const updateBooking = async (
  bookingId: string,
  status: string,
  reason?: string
) => {
  const response = await axiosInstance.put(
    HOST_API.hostAccount.updateBookingStatus(bookingId, status, reason)
  );
  return response.data;
};


export const allReviews = async (
  page: number,
  limit: number,
) => {
  const response = await axiosInstance.get(HOST_API.hostAccount.hostReviews, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};