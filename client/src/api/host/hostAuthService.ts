import axiosInstance from "@/config/host/hostAxiosInstence";

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
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const hostSignup = async (data: HostRegisterData) => {
  const response = await axiosInstance.post("/auth/signup", data);
  console.log(response);
  return response.data;
};
