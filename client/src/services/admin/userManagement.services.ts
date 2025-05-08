import axiosInstance from "@/config/admin/adminAxiosInstence";
import { AxiosError } from "axios";
import { User } from "@/utils/types";
import logger from "@/utils/logger";

interface GetUsersResponse {
  data: User[];
  message: string;
  success: boolean;
}

interface BlockUserResponse {
  message?: string;
}

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get<GetUsersResponse>("/getAllUsers");
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

export const blockUser = async (userId: string): Promise<BlockUserResponse> => {
  try {
    if (!userId) {
      logger.error({ userId }, "User ID is required");
      throw new Error("User ID is required");
    }
    logger.debug({ userId }, "Attempting to block user");
    const response = await axiosInstance.patch<BlockUserResponse>(
      `users/${userId}/block`,
      { isBlocked: true }
    );
    logger.info(
      { userId, response: response.data },
      "User blocked successfully"
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage = error.response?.data?.message || error.message;
      logger.error({ userId, error: errorMessage }, "Blocking failed");
      throw new Error(`Blocking failed: ${errorMessage}`);
    } else {
      const errorMessage = (error as Error).message || "Something went wrong";
      logger.error({ userId, error: errorMessage }, "Blocking failed");
      throw new Error(`Blocking failed: ${errorMessage}`);
    }
  }
};
