import { Request, Response } from "express";
import { UserManagementUseCase } from "../../../application/use-cases/admin/UserManagement.usecase";
import logger from "../../../utils/logger";
import { JwtPayload } from "jsonwebtoken";
import { AuthRequest } from "../../../domain/entities/controlInterface/authType";

interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class UserAdminController {
  constructor(private userManagementUseCase: UserManagementUseCase) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userManagementUseCase.execute();
      res.status(200).json({
        message: "Users list fetched successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      logger.error(String(error), "Error fetching user list");
      res.status(500).json({
        success: false,
        message: "Users list currently not available",
      });
    }
  }

  async blockOrUnblockUser(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;
    const { isBlocked } = req.body;

    if (!userId || typeof isBlocked !== "boolean") {
      res.status(400).json({
        success: false,
        message: "Missing or invalid userId or isBlocked",
      });
      return;
    }

    try {
      const response = await this.userManagementUseCase.UserBlockUnblock(
        userId,
        isBlocked
      );
      res.status(200).json({
        message: `User account ${
          isBlocked ? "blocked" : "unblocked"
        } successfully`,
        success: true,
        response,
      });
    } catch (error) {
      logger.error(String(error), "Error blocking/unblocking user");
      res.status(500).json({
        success: false,
        message: "Error while blocking/unblocking the account",
      });
    }
  }

  async editUser(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;
    const formData = req.body;

    if (!userId || !formData) {
      res.status(400).json({
        success: false,
        message: "Missing userId or form data",
      });
      return;
    }

    try {
      const users = await this.userManagementUseCase.editUser(userId, formData);
      res.status(200).json({
        message: "User details updated successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      logger.error(String(error), "Error updating user details");
      res.status(500).json({
        success: false,
        message: "Failed to update user details",
      });
    }
  }

  async changeProfile(req: MulterRequest, res: Response) {
    try {
      const userId = req.auth?.userId;
      const image = req.file;

      if (!image) {
        return res.status(400).json({
          success: false,
          message: "No image file uploaded.",
        });
      }

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. No user ID found in request.",
        });
      }

      const updatedUser = await this.userManagementUseCase.changeProfile(
        userId,
        image
      );

      res.status(200).json({
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
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async deleteUser(req: AuthRequest, res: Response): Promise<void> {
    const userId = req.auth?.id;

    if (!userId) {
      res.status(400).json({
        success: false,
        message: "Missing or invalid userId",
      });
      return;
    }

    try {
      const isDeleted = await this.userManagementUseCase.deleteUser(userId);

      if (!isDeleted) {
        res.status(404).json({
          success: false,
          message: "User not found or already deleted",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "User account deleted successfully",
      });
    } catch (error) {
      logger.error(String(error), "Error deleting user");
      res.status(500).json({
        success: false,
        message: "Error while deleting the account",
      });
    }
  }
}
