import axiosInstance from "@/config/hostaxiosInstence";


export interface HostRegisterData {
    name: string;
    email: string;
    password: string;
    phone:string;
    location: string;
  }
  
  
  export interface HostLoginData{
    email:string;
    password:string
  }

  export const loginHost = async (data: HostLoginData) => {
    const response = await axiosInstance.post("/auth/login-host", data);
    
    return response.data;
  };
  
  
  export const registerHost = async (data: HostRegisterData) => {
    const response = await axiosInstance.post("/auth/register", data);
    console.log(response)
    return response.data;
  };