import axiosInstance from "@/config/user/userAxiosInstence";

import { profileModify } from "@/utils/Types/user/profileTypes";

export const changeProfile = async (formData: FormData) => {
  const response = await axiosInstance.put(`/setProfilePhoto`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data.data;
};

export const profileEdit = async (data: profileModify) => {
  const response = await axiosInstance.post("/profileModify", data);
  return response.data;
};

export const getVenues = async () => {
  const response = await axiosInstance.get("/getVenues");
  return response.data.data;
};

export const getRentcars = async () => {
  const response = await axiosInstance.get("/getRentcars");
  return response.data.data;
};
