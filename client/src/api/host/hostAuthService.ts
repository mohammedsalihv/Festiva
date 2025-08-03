import axiosInstance from "@/config/host/hostAxiosInstence";
import { HOST_API } from "@/utils/constants/api endpoints/host.api";
import { hostUsualSignupData } from "@/utils/Types/host/authentication/hostUsualSignup";
import { hostgoogleSignupData } from "@/utils/Types/host/authentication/hostGoogleSignup";
import { hostGoogleLoginData } from "@/utils/Types/host/authentication/hostGoogleLogin";

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

export const hostGoogleLogin = async (data: hostGoogleLoginData) => {
  const response = await axiosInstance.post(
    HOST_API.Authentication.hostGoogleLogin,
    data
  );
  return response.data;
};

export const hostSignup = async (data: hostUsualSignupData) => {
  const response = await axiosInstance.post(
    HOST_API.Authentication.hostSignup,
    data
  );
  return response.data;
};

export const hostGoogleSignup = async (data: hostgoogleSignupData) => {
  const response = await axiosInstance.post(
    HOST_API.Authentication.hostGoogleSignup,
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
