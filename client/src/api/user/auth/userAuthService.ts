import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";
import {
  SignupData,
  LoginData,
  userGoogleLogin
} from "@/utils/Types/user/authTypes";
import {
  changePasswordState,
  resetPaswordPayload,
} from "@/utils/Types/user/profileTypes";

export const registerUser = async (data: SignupData) => {
  const response = await axiosInstance.post(
    USER_API.Authentication.userSignup,
    data
  );
  return response.data;
};


export const LoginUser = async (data: LoginData) => {
  const response = await axiosInstance.post(
    USER_API.Authentication.userLogin,
    data
  );
  return response.data;
};

export const sendOtp = async ({ email }: { email: string }) => {
  const response = await axiosInstance.post(USER_API.Authentication.sendOtp, {
    email,
  });
  return response.data;
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  const response = await axiosInstance.post(USER_API.Authentication.verifyOtp, {
    email,
    otp,
  });
  return response.data;
};

export const validateEmail = async (email: string) => {
  const response = await axiosInstance.get(
    USER_API.Authentication.validateEmail(email)
  );
  return response.data;
};

export const passwordModify = async (data: changePasswordState) => {
  const response = await axiosInstance.post(
    USER_API.Authentication.passwordChange,
    data
  );
  return response.data;
};

export const resetPassword = async (data: resetPaswordPayload) => {
  const response = await axiosInstance.post(
    USER_API.Authentication.passwordReset,
    data
  );
  return response.data;
};

export const googleLogin = async (data: userGoogleLogin) => {
  const response = await axiosInstance.post(
    USER_API.Authentication.userGoogleLogin,
    data
  );
  return response.data;
};

export const deleteProfile = async () => {
  const response = await axiosInstance.delete(
    USER_API.userAccount.profileDelete
  );
  return response.data;
};

export const userLogout = async () => {
  const response = await axiosInstance.delete(
    USER_API.Authentication.userLogout
  );
  return response.data;
};


export const getProfileImage = async (userId: string) => {
  const response = await axiosInstance.get(
    USER_API.userAccount.profileImage(userId),
    { responseType: "blob" }
  );
  return response.data;
};

