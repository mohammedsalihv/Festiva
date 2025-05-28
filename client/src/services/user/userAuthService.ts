import axiosInstance from "@/config/user/userAxiosInstence";
import {
  GoogleLoginData,
  SignupData,
  LoginData,
} from "@/utils/Types/user/authTypes";
import { changePasswordState ,resetPaswordPayload } from "@/utils/Types/user/profileTypes";

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

export const validateEmail = async (email: string) => {
  const response = await axiosInstance.get(`/auth/checkMail/${email}`);
  return response.data;
};

export const passwordModify = async (data: changePasswordState) => {
  const response = await axiosInstance.post("/auth/passwordModify", data);
  return response.data;
};

export const resetPassword = async (data: resetPaswordPayload) => {
  const response = await axiosInstance.post("/auth/password/reset", data);
  return response.data;
};


export const googleLogin = async (data: GoogleLoginData) => {
  const response = await axiosInstance.post("/auth/google-login", data);
  return response.data;
};

export const deleteProfile = async () => {
  const response = await axiosInstance.delete('/auth/profile/delete');
  return response.data;
};

export const userLogout = async () => {
  const response = await axiosInstance.delete("/auth/logout");
  return response.data;
};
