import axiosInstance from "@/config/host/hostAxiosInstence";

export const addVenue = async (data: FormData) => {
  const response = await axiosInstance.post("/addVenue", data);
  return response.data;
};

export const addRentCar = async (data: FormData) => {
  const response = await axiosInstance.post("/addRentCar", data);
  return response.data;
};

export const addCaters = async (data: FormData) => {
  const response = await axiosInstance.post("/addCaters", data);
  return response.data;
};

export const addStudio = async (data: FormData) => {
  const response = await axiosInstance.post("/addStudio", data);
  return response.data;
};
