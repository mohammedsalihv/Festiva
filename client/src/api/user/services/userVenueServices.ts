import axiosInstance from "@/config/user/userAxiosInstence";

export const getVenues = async () => {
  const response = await axiosInstance.get("/getVenues");
  return response.data.data;
};
