import { Request, Response } from "express";
import { UserManagementUseCase } from "../../../application/use-cases/admin/UserManagement.usecase";
import logger from "../../../utils/logger";

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

  async blockOrUnblockUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
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

  async editUser(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;
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
}
