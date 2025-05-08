import { Request, Response } from "express";
import { UserManagementUseCase } from "../../../application/use-cases/admin/UserManagement.usecase";
import logger from "../../../utils/logger";

export class UserAdminController {
  constructor(private UserManagementUseCase: UserManagementUseCase) {}

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.UserManagementUseCase.execute();
      res.status(200).json({
        message: "Users list fetched successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Users lists currently not available",
      });
      logger.error(error);
    }
  }
}
