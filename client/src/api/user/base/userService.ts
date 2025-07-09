import axiosInstance from "@/config/user/userAxiosInstence";
import { USER_API } from "@/utils/constants/api endpoints/user.api";

import { profileModify } from "@/utils/Types/user/profileTypes";

export const changeProfile = async (formData: FormData) => {
  const response = await axiosInstance.put(
    USER_API.userAccount.changeProfile,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
};

export const profileEdit = async (data: profileModify) => {
  const response = await axiosInstance.post(
    USER_API.userAccount.profileEdit,
    data
  );
  return response.data;
};
