import axiosInstance from "@/config/user/userAxiosInstence";
import axios from "axios";

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

export interface GoogleLoginData {
  name: string;
  email: string;
  sub: string;
}


export const registerUser = async (data: SignupData) => {
  const response = await axiosInstance.post("/auth/signup", data);
  return response.data;
};

export const LoginUser = async (data: LoginData) => {
  try {
    const response = await axiosInstance.post("/auth/login", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("Login failed:", error.message);
    } else {
      console.error("Login failed: Unknown error", error);
    }
    throw error;
  }
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
  const response = await axiosInstance.post("/auth/verify_otp", { email, otp });
  return response.data;
};


export const GoogleLogin = async (data: GoogleLoginData) => {
  try {
    const response = await axiosInstance.post("/auth/google-login", data);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("google login failed:", error.response?.data || error.message);
    } else if (error instanceof Error) {
      console.error("google login:", error.message);
    } else {
      console.error("google login: Unknown error", error);
    }
    throw error;
  }
};