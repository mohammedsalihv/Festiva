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
