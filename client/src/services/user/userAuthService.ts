import axiosInstance from "@/config/user/userAxiosInstence";
import { GoogleLoginData } from "@/utils/Types/user/authTypes";

export interface SignupData {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async (data: SignupData) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};

export const LoginUser = async (data: LoginData) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const sendOtp = async ({ email }: { email: string }) => {
  const response = await axiosInstance.post("/auth/send-otp", { email });
  return response.data;
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const response = await axiosInstance.post("/auth/verifyOtp", { email, otp });
  return response.data;
};

export const googleLogin = async (data: GoogleLoginData) => {
  const response = await axiosInstance.post("/auth/google-login", data);
  return response.data;
};