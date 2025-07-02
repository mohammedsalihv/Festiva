import axiosInstance from "@/config/user/userAxiosInstence";


export const getStudios = async () => {
  const response = await axiosInstance.get("/getStudios");
  return response.data.data;
};

