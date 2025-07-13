import axiosInstance from "@/config/host/hostAxiosInstence";
import { HOST_API } from "@/utils/constants/api endpoints/host.api";

export interface HostRegisterData {
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
}

export interface HostLoginData {
  email: string;
  password: string;
}

export const hostLogin = async (data: HostLoginData) => {
  const response = await axiosInstance.post(
    HOST_API.Authentication.hostLogin,
    data
  );
  return response.data;
};

export const hostSignup = async (data: HostRegisterData) => {
  const response = await axiosInstance.post(
    HOST_API.Authentication.hostSignup,
    data
  );
  return response.data;
};

export const validateEmail = async (email: string) => {
  const response = await axiosInstance.post(
    HOST_API.Authentication.validateEmail(),
    { email }
  );
  return response.data;
};

export const hostLogout = async () => {
  const response = await axiosInstance.delete(
    HOST_API.Authentication.hostLogout
  );
  return response.data;
};
