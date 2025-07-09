import axiosInstance from "@/config/host/hostAxiosInstence";
import { HOST_API } from "@/utils/constants/api endpoints/host.api";

export const addVenue = async (data: FormData) => {
  const response = await axiosInstance.post(
    HOST_API.venueService.addVenue,
    data
  );
  return response.data;
};

export const addRentCar = async (data: FormData) => {
  const response = await axiosInstance.post(
    HOST_API.rentcarService.addRentcar,
    data
  );
  return response.data;
};

export const addCaters = async (data: FormData) => {
  const response = await axiosInstance.post(
    HOST_API.catersService.addCaters,
    data
  );
  return response.data;
};

export const addStudio = async (data: FormData) => {
  const response = await axiosInstance.post(
    HOST_API.studioService.addStudio,
    data
  );
  return response.data;
};
