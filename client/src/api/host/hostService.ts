import axiosInstance from "@/config/host/hostAxiosInstence";

export const addVenue = async (data:FormData) => {
  const response = await axiosInstance.post("/addVenue", data);
  console.log(response);
  return response.data;
};
