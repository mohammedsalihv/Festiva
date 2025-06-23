import axiosInstance from "@/config/host/hostAxiosInstence";

export const addVenue = async (data:FormData) => {
  console.log(data)
  const response = await axiosInstance.post("/addVenue", data);
  console.log(response);
  return response.data;
};

export const addRentCar = async (data:FormData) => {
  console.log(data)
  const response = await axiosInstance.post("/addRentCar", data);
  console.log(response);
  return response.data;
};
