import axiosInstance from "@/config/admin/adminAxiosInstence";
import {
  EditHostPayload,
  EditHostResponse,
  GetHostsResponse,
  BlockHostResponse,
} from "@/utils/Types/admin/hostManagementTypes";


export const getAllHosts = async () => {
  const response = await axiosInstance.get<GetHostsResponse>("/hosts");
  return response.data.data;
};

export const blockUnblockHost = async (
  isBlocked: boolean,
  hostId:string
): Promise<BlockHostResponse> => {
  const response = await axiosInstance.patch<BlockHostResponse>(
    `hosts/blockUnblock/${hostId}`,
    { isBlocked: isBlocked }
  );
  return response.data;
};

export const editHostDetails = async (
  formData: EditHostPayload,
  hostId:string
): Promise<EditHostResponse> => {
  const response = await axiosInstance.patch<EditHostResponse>(
    `hosts/edit/${hostId}`,
    formData
  );
  return response.data;
};

export const changeProfile = async (formData: FormData,hostId:string) => {
  const response = await axiosInstance.put(
    `hosts/changeprofile/${hostId}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data.data;
};

export const deleteHost = async (hostId:string) => {
  const response = await axiosInstance.delete(`hosts/${hostId}`);
  return response.data.data;
};
