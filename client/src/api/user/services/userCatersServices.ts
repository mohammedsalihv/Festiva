import axiosInstance from "@/config/user/userAxiosInstence";


export const getCaters = async () => {
  const response = await axiosInstance.get("/getCaters");
  return response.data.data;
};

