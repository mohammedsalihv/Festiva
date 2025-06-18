import { Request, Response } from "express";
import { AdminUserManagementUseCase } from "../../../../application/use-cases/admin/adminManagement/usecase.adminUserManagement";
import logger from "../../../../utils/common/messages/logger";
import { JwtPayload } from "jsonwebtoken";
import { validateAndGetImageUrl } from "../../../../utils/common/cloudinary/imageUtils";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class AdminUsersController {
  constructor(private AdminUserManagementUseCase: AdminUserManagementUseCase) {}

  async Users(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.AdminUserManagementUseCase.execute();
      res.status(statusCodes.Success).json({
        message: "Users list fetched successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      logger.error(String(error), "Error fetching user list");
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Users list currently not available",
      });
    }
  }

  async blockOrUnblockUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    const { isBlocked } = req.body;

    if (!userId || typeof isBlocked !== "boolean") {
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "Missing or invalid userId or isBlocked",
      });
      return;
    }

    try {
      const response = await this.AdminUserManagementUseCase.UserBlockUnblock(
        userId,
        isBlocked
      );
      res.status(statusCodes.Success).json({
        message: `User account ${
          isBlocked ? "blocked" : "unblocked"
        } successfully`,
        success: true,
        response,
      });
    } catch (error) {
      logger.error(String(error), "Error blocking/unblocking user");
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Error while blocking/unblocking the account",
      });
    }
  }

  async editUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;
    const formData = req.body;

    if (!userId || !formData) {
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "Missing userId or form data",
      });
      return;
    }

    try {
      const users = await this.AdminUserManagementUseCase.editUser(
        userId,
        formData
      );
      res.status(statusCodes.Success).json({
        message: "User details updated successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      logger.error(String(error), "Error updating user details");
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Failed to update user details",
      });
    }
  }

  async changeProfile(req: MulterRequest, res: Response) {
    try {
      const userId = req.params.userId;
      const image = validateAndGetImageUrl(req.file);

      if (!image) {
        return res.status(statusCodes.forbidden).json({
          success: false,
          message: "No image file uploaded.",
        });
      }

      if (!userId) {
        return res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Unauthorized. No user ID found in request.",
        });
      }

      const updatedUser = await this.AdminUserManagementUseCase.changeProfile(
        userId,
        image
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Profile image changed!",
        data: {
          profilePhotoUrl: updatedUser.profilePic,
          ...updatedUser,
        },
      });
    } catch (error: any) {
      logger.error("Profile change Error:", error);

      if (error.message === "User not found") {
        return res.status(statusCodes.notfound).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const userId = req.params.userId;

    if (!userId) {
      res.status(statusCodes.unAuthorized).json({
        success: false,
        message: "Missing or invalid userId",
      });
      return;
    }

    try {
      const isDeleted = await this.AdminUserManagementUseCase.deleteUser(
        userId
      );
      if (!isDeleted) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "User not found or already deleted",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "User account deleted successfully",
      });
    } catch (error) {
      logger.error(String(error), "Error deleting user");
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Error while deleting the account",
      });
    }
  }
}
