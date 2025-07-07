import axiosInstance from "@/config/host/hostAccountAxiosInstence";

export const allNotification = async () => {
  const response = await axiosInstance.get("/notifications");
  return response.data;
};


export const getAllAssetRequests = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get("/requests", {
    params: { page, limit },
  });

  return response.data; 
};
