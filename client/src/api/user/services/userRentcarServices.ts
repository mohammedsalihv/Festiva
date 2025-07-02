import axiosInstance from "@/config/user/userAxiosInstence";

export const getRentcars = async () => {
  const response = await axiosInstance.get("/getRentcars");
  return response.data.data;
};
