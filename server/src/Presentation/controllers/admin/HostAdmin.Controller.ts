import { Request, Response } from "express";
import { HostManagementUseCase } from "../../../application/use-cases/admin/HostManagement.usecase";
import logger from "../../../utils/logger";
import { AuthRequest } from "../../../domain/entities/controlInterface/authType";
import { JwtPayload } from "jsonwebtoken";

interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

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
    const hostId = req.params.hostId;
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

  async editHost(req: AuthRequest, res: Response): Promise<void> {
    const hostId = req.params.hostId;
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

  async changeProfile(req: MulterRequest, res: Response) {
    try {
      const hostId = req.params.hostId;
      const image = req.file;

      if (!image) {
        res.status(400).json({
          success: false,
          message: "No image file uploaded.",
        });
      }
      if (!hostId) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized. No host ID found in request.",
        });
      }

      const updatedHost = await this.HostManagementUseCase.changeProfile(
        hostId,
        image
      );

      res.status(200).json({
        success: true,
        message: "Profile image changed!",
        data: {
          profilePhotoUrl: updatedHost.profilePic,
          ...updatedHost,
        },
      });
    } catch (error: any) {
      logger.error("Profile change Error:", error);

      if (error.message === "Host not found") {
        return res.status(404).json({
          success: false,
          message: "Host not found",
        });
      }

      res.status(500).json({
        success: false,
        message: error.message || "Internal server error",
      });
    }
  }

  async deleteHost(req: AuthRequest, res: Response): Promise<void> {
    const hostId = req.params.hostId;

    if (!hostId) {
      res.status(400).json({
        success: false,
        message: "Missing or invalid hostId",
      });
      return;
    }

    try {
      const isDeleted = await this.HostManagementUseCase.deleteHost(hostId);

      if (!isDeleted) {
        res.status(404).json({
          success: false,
          message: "Host not found or already deleted",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Host account deleted successfully",
      });
    } catch (error) {
      logger.error(String(error), "Error deleting host");
      res.status(500).json({
        success: false,
        message: "Error while deleting the account",
      });
    }
  }
}
