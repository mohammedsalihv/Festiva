import axiosInstance from "@/config/admin/adminAxiosInstence";
import { ADMIN_API } from "@/utils/constants/api endpoints/admin.api";
import {
  EditHostPayload,
  EditHostResponse,
  GetHostsResponse,
  BlockHostResponse,
} from "@/utils/Types/admin/hostManagementTypes";

export const getAllHosts = async (page = 1, limit = 10) => {
  const response = await axiosInstance.get<GetHostsResponse>(
    ADMIN_API.hostManagement.getAllHosts,
    { params: { page, limit } }
  );
  return response.data;
};

export const blockUnblockHost = async (
  isBlocked: boolean,
  hostId: string
): Promise<BlockHostResponse> => {
  const response = await axiosInstance.patch<BlockHostResponse>(
    ADMIN_API.hostManagement.blockUnblock(hostId),
    { isBlocked }
  );
  return response.data;
};

export const editHostDetails = async (
  formData: EditHostPayload,
  hostId: string
): Promise<EditHostResponse> => {
  const response = await axiosInstance.patch<EditHostResponse>(
    ADMIN_API.hostManagement.editHost(hostId),
    formData
  );
  return response.data;
};

export const changeProfile = async (
  formData: FormData,
  hostId: string
) => {
  const response = await axiosInstance.put(
    ADMIN_API.hostManagement.changeProfile(hostId),
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
};

export const deleteHost = async (hostId: string) => {
  const response = await axiosInstance.delete(
    ADMIN_API.hostManagement.deleteHost(hostId)
  );
  return response.data.data;
};
