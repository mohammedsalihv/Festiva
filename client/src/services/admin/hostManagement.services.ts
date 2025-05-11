import axiosInstance from "@/config/admin/adminAxiosInstence";
import { AxiosError } from "axios";
import {
  EditHostPayload,
  EditHostResponse,
  GetHostsResponse,
  BlockHostResponse,
} from "@/utils/types";
import logger from "@/utils/logger";

export const getAllHosts = async () => {
  try {
    const response = await axiosInstance.get<GetHostsResponse>("/getAllHosts");
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    } else {
      console.error(
        "Fetching hosts list failed:",
        (error as Error).message || "Unknown error"
      );
      throw error;
    }
  }
};

export const blockUnblockHost = async (
  hostId: string,
  isBlocked: boolean
): Promise<BlockHostResponse> => {
  console.log(hostId, isBlocked);
  try {
    if (!hostId || isBlocked === undefined || isBlocked === null) {
      logger.error({ hostId }, "Host ID or action is required");
      throw new Error("Host ID or action is required");
    }
    logger.debug({ hostId }, "Attempting to block host");
    const response = await axiosInstance.patch<BlockHostResponse>(
      `hosts/${hostId}/blockUnblock`,
      { isBlocked: isBlocked }
    );
    logger.info(
      { hostId, response: response.data },
      "Host blocked successfully"
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || error.message;
      logger.error(
        { hostId, error: errorMessage },
        "Blocking/Unblocking failed"
      );
      throw new Error(`Blocking failed: ${errorMessage}`);
    } else {
      const errorMessage = (error as Error).message || "Something went wrong";
      logger.error(
        { hostId, error: errorMessage },
        "Blocking/Unblocking failed"
      );
      throw new Error(`Blocking/Unblocking failed: ${errorMessage}`);
    }
  }
};

export const editHostDetails = async (
  hostId: string,
  formData: EditHostPayload
): Promise<EditHostResponse> => {
  try {
    if (!hostId) {
      throw new Error("Host ID is required");
    }

    logger.debug({ hostId, formData }, "Editing host details");

    const response = await axiosInstance.patch<EditHostResponse>(
      `hosts/${hostId}/edit`,
      formData
    );

    logger.info(
      { hostId, response: response.data },
      "Host updated successfully"
    );
    return response.data;
  } catch (error: unknown) {
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message || error.message
        : (error as Error).message || "Something went wrong";

    logger.error({ hostId, error: message }, "Edit host failed");
    throw new Error(`Edit host failed: ${message}`);
  }
};
