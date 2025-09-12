import { Request, Response } from "express";
import { IAdminHostManagementController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminManagementControllerInterfaces/interface.adminHostManagementController";
import { IAdminHostManagementUseCase } from "../../../../domain/usecaseInterface/admin/managementUsecaseInterfaces/interface.adminHostManagementUseCase";
import logger from "../../../../utils/baseUtilities/messages/logger";
import { AuthRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authType";
import { JwtPayload } from "jsonwebtoken";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { uploadProfileImage } from "../../../../utils/baseUtilities/cloudinary/uploadProfileImage";
import { authenticationRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";


interface MulterRequest extends Request {
  file: Express.Multer.File;
  auth?: JwtPayload & { id: string; role?: string };
}

export class AdminHostsController implements IAdminHostManagementController {
  constructor(private _adminHostManagementUseCase: IAdminHostManagementUseCase) {}

 async getAllHosts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const users = await this._adminHostManagementUseCase.findAllHosts(
        page,
        limit
      );

      res.status(statusCodes.Success).json({
        message: "Hosts list fetched successfully",
        success: true,
        ...users,
      });
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Hosts list currently not available",
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
      const response = await this._adminHostManagementUseCase.HostblockUnblock(
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

  async editHost(req: authenticationRequest, res: Response): Promise<void> {
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
      const hosts = await this._adminHostManagementUseCase.editHost(
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

  async changeProfile(req: MulterRequest, res: Response): Promise<void> {
    try {
      const hostId = req.params.hostId;
      const file = req.file;

      if (!file) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "No image file uploaded.",
        });
        return;
      }

      if (!hostId) {
        res.status(statusCodes.unAuthorized).json({
          success: false,
          message: "Unauthorized. No host ID found in request.",
        });
        return;
      }

      const image = await uploadProfileImage({
        id: hostId,
        buffer: file.buffer,
      });

      const updatedHost = await this._adminHostManagementUseCase.changeProfile(
        hostId,
        image.public_id
      );

      res.status(statusCodes.Success).json({
        success: true,
        message: "Profile image changed!",
        data: {
          profilePhotoUrl: image.public_id,
          ...updatedHost,
        },
      });
      return;
    } catch (error: any) {
      logger.error("Profile change Error:", error);

      if (error.message === "Host not found") {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "Host not found",
        });
        return;
      }

      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
      return;
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
      const isDeleted = await this._adminHostManagementUseCase.deleteHost(
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
