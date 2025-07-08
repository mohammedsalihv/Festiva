import axiosInstance from "@/config/admin/adminAxiosInstence";
import {
  EditUserPayload,
  EditUserResponse,
  BlockUserResponse,
  GetUsersResponse,
} from "@/utils/Types/admin/userManagementTypes";
import { User } from "@/utils/Types/user/authTypes";

export const AllUsers = async (
  page: number,
  limit: number
): Promise<{
  data: User[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
}> => {
  const response = await axiosInstance.get<GetUsersResponse>("/users", {
    params: { page, limit },
  });
  return response.data.data;
};

export const blockUnblockUser = async (
  isBlocked: boolean,
  userId: string
): Promise<BlockUserResponse> => {
  const response = await axiosInstance.patch<BlockUserResponse>(
    `users/blockUnblock/${userId}`,
    { isBlocked: isBlocked }
  );
  return response.data;
};

export const editUserDetails = async (
  formData: EditUserPayload,
  userId: string
): Promise<EditUserResponse> => {
  const response = await axiosInstance.patch<EditUserResponse>(
    `users/edit/${userId}`,
    formData
  );
  return response.data;
};

export const changeProfile = async (formData: FormData, userId: string) => {
  const response = await axiosInstance.put(
    `users/changeprofile/${userId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
};

export const deleteUser = async (userId: string) => {
  const response = await axiosInstance.delete(`users/${userId}`);
  return response.data.data;
};
