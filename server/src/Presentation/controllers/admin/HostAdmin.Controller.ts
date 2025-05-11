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

  async blockOrUnblockHost(req: Request, res: Response): Promise<void> {
    const { hostId } = req.params;
    const { isBlocked } = req.body;

    if (!hostId || typeof isBlocked !== "boolean") {
      res.status(400).json({
        success: false,
        message: "Missing or invalid hostId or isBlocked",
      });
      return;
    }

    try {
      const response = await this.HostManagementUseCase.HostBlockUnblock(
        hostId,
        isBlocked
      );
      res.status(200).json({
        message: `Host account ${
          isBlocked ? "blocked" : "unblocked"
        }  successfully`,
        success: true,
        response,
      });
    } catch (error) {
      logger.error(String(error), "Error blocking/unblocking host");
      res.status(500).json({
        message: "Error while blocking/unblocking the account",
        success: false,
      });
    }
  }

  async editHost(req: Request, res: Response): Promise<void> {
    const { hostId } = req.params;
    const formData = req.body;

    if (!hostId || !formData) {
      res.status(400).json({
        success: false,
        message: "Missing hostId or form data",
      });
      return;
    }

    try {
      const hosts = await this.HostManagementUseCase.editHost(hostId, formData);
      res.status(200).json({
        message: "Host details updated successfully",
        success: true,
        data: hosts,
      });
    } catch (error) {
      logger.error(String(error), "Error updating host details");
      res.status(500).json({
        success: false,
        message: "Failed to update host details",
      });
    }
  }
}
