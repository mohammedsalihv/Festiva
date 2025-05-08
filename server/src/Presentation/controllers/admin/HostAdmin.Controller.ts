import { Request, Response } from "express";
import { HostManagementUseCase } from "../../../application/use-cases/admin/HostManagement.usecase";
import logger from "../../../utils/logger";

export class HostAdminController {
  constructor(private HostManagementUseCase: HostManagementUseCase) {}

  async getHosts(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.HostManagementUseCase.execute();
      res.status(200).json({
        message: "Hosts list fetched successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Hosts lists currently not available",
      });
      logger.error(error);
    }
  }
}
