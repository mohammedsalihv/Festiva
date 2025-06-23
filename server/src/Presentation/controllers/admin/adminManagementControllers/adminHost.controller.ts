import { Request, Response } from "express";
import { AdminHostManagementUseCase } from "../../../../application/use-cases/admin/adminManagement/usecase.adminHostManagement";
import logger from "../../../../utils/common/messages/logger";
import { AuthRequest } from "../../../../domain/controlInterface/authentication/authType";
import { JwtPayload } from "jsonwebtoken";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { uploadProfileImage } from "../../../../utils/common/cloudinary/uploadProfileImage";

interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class AdminHostsController {
  constructor(private AdminHostManagementUseCase: AdminHostManagementUseCase) {}

  async Hosts(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.AdminHostManagementUseCase.execute();
      res.status(statusCodes.Success).json({
        message: "Hosts list fetched successfully",
        success: true,
        data: users,
      });
    } catch (error) {
      res.status(statusCodes.serverError).json({
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
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "Missing or invalid hostId or isBlocked",
      });
      return;
    }

    try {
      const response = await this.AdminHostManagementUseCase.HostBlockUnblock(
        hostId,
        isBlocked
      );
      res.status(statusCodes.Success).json({
        message: `Host account ${
          isBlocked ? "blocked" : "unblocked"
        }  successfully`,
        success: true,
        response,
      });
    } catch (error) {
      logger.error(String(error), "Error blocking/unblocking host");
      res.status(statusCodes.serverError).json({
        message: "Error while blocking/unblocking the account",
        success: false,
      });
    }
  }

  async editHost(req: AuthRequest, res: Response): Promise<void> {
    const hostId = req.params.hostId;
    const formData = req.body;

    if (!hostId || !formData) {
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "Missing hostId or form data",
      });
      return;
    }

    try {
      const hosts = await this.AdminHostManagementUseCase.editHost(
        hostId,
        formData
      );
      res.status(statusCodes.Success).json({
        message: "Host details updated successfully",
        success: true,
        data: hosts,
      });
    } catch (error) {
      logger.error(String(error), "Error updating host details");
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Failed to update host details",
      });
    }
  }

  async changeProfile(req: MulterRequest, res: Response) {
    try {
      const hostId = req.params.hostId;
      const file = req.file;

      if (!file) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "No image file uploaded.",
        });
      }
      if (!hostId) {
        return res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Unauthorized. No host ID found in request.",
        });
      }

      const image = await uploadProfileImage({
        id: hostId,
        buffer: file.buffer,
      });

      const updatedHost = await this.AdminHostManagementUseCase.changeProfile(
        hostId,
        image.url
      );

      res.status(statusCodes.Success).json({
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
        return res.status(statusCodes.notfound).json({
          success: false,
          message: "Host not found",
        });
      }

      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }

  async deleteHost(req: AuthRequest, res: Response): Promise<void> {
    const hostId = req.params.hostId;

    if (!hostId) {
      res.status(statusCodes.unAuthorized).json({
        success: false,
        message: "Missing or invalid hostId",
      });
      return;
    }

    try {
      const isDeleted = await this.AdminHostManagementUseCase.deleteHost(
        hostId
      );

      if (!isDeleted) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "Host not found or already deleted",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Host account deleted successfully",
      });
    } catch (error) {
      logger.error(String(error), "Error deleting host");
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Error while deleting the account",
      });
    }
  }
}
