import axiosInstance from "@/config/admin/adminAxiosInstence";
import { AxiosError } from "axios";
import {
  EditUserPayload,
  EditUserResponse,
  BlockUserResponse,
  GetUsersResponse,
} from "@/utils/types";
import logger from "@/utils/logger";

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get<GetUsersResponse>("/users");
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Login failed:", error.response?.data || error.message);
      throw error;
    } else {
      console.error(
        "Fetching users list failed:",
        (error as Error).message || "Unknown error"
      );
      throw error;
    }
  }
};

export const blockUnblockUser = async (
  userId: string,
  isBlocked: boolean
): Promise<BlockUserResponse> => {
  try {
    if (!userId || isBlocked === undefined || isBlocked === null) {
      logger.error({ userId }, "User ID or action is required");
      throw new Error("User ID or action is required");
    }
    logger.debug({ userId }, "Attempting to block user");
    const response = await axiosInstance.patch<BlockUserResponse>(
      `users/${userId}/blockUnblock`,
      { isBlocked: isBlocked }
    );
    logger.info(
      { userId, response: response.data },
      "User blocked successfully"
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || error.message;
      logger.error(
        { userId, error: errorMessage },
        "Blocking/Unblocking failed"
      );
      throw new Error(`Blocking failed: ${errorMessage}`);
    } else {
      const errorMessage = (error as Error).message || "Something went wrong";
      logger.error(
        { userId, error: errorMessage },
        "Blocking/Unblocking failed"
      );
      throw new Error(`Blocking/Unblocking failed: ${errorMessage}`);
    }
  }
};

export const editUserDetails = async (
  userId: string,
  formData: EditUserPayload
): Promise<EditUserResponse> => {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    logger.debug({ userId, formData }, "Editing user details");

    const response = await axiosInstance.patch<EditUserResponse>(
      `users/${userId}/edit`,
      formData
    );

    logger.info(
      { userId, response: response.data },
      "User updated successfully"
    );
    return response.data;
  } catch (error: unknown) {
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message || error.message
        : (error as Error).message || "Something went wrong";

    logger.error({ userId, error: message }, "Edit user failed");
    throw new Error(`Edit user failed: ${message}`);
  }
};


export const changeProfile = async (userId: string, formData: FormData) => {
  try {
    const response = await axiosInstance.put(`users/changeprofile/${userId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "Change profile photo failed:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Failed to update profile");
    }
    throw new Error("Failed to update profile");
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const response = await axiosInstance.delete(`users/${userId}`);
    return response.data.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error(
        "User account deleting failed:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data?.message || "Failed to delete");
    }
    throw new Error("Failed to delete");
  }
};