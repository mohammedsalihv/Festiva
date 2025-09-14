import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IAdminAssetManagementController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminManagementControllerInterfaces/interface.adminAssetManagementController";
import { IAdminAssetManagementUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminManagementUsecaseInterfaces/interface.adminAssetManagementUseCase";
import { IAdminNotificationUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminManagementUsecaseInterfaces/interface.adminNotificationUsecase";
import { IAdminVenueController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminServicesControllerInterfaces/interface.adminVenueController";
import { IAdminRentCarController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminServicesControllerInterfaces/interface.adminRentCarController";
import { IAdminCatersController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminServicesControllerInterfaces/interface.adminCatersController";
import { IAdminStudioController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminServicesControllerInterfaces/interface.adminStudioController";
import logger from "../../../../utils/baseUtilities/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import { getIO } from "../../../../config/socket";

interface AuthRequest extends Request {
  auth?: JwtPayload & { id: string; role?: string };
}

export class AdminAssetManagementController implements IAdminAssetManagementController {
  constructor(
    private _adminAssetManagementUseCase: IAdminAssetManagementUseCase,
    private _adminNotificationUseCase: IAdminNotificationUseCase,
    private _adminVenueController: IAdminVenueController,
    private _adminRentCarController: IAdminRentCarController,
    private _adminStudioController: IAdminStudioController,
    private _adminCatersController: IAdminCatersController
  ) {}

  async Assets(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.params.typeOfAsset;
      const assets = await this._adminAssetManagementUseCase.execute(
        typeOfAsset
      );
      res.status(statusCodes.Success).json({
        success: true,
        message: "Assets fetched successfully",
        data: assets,
      });
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async assetDetails(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.query.type?.toString().toLowerCase();
      if (!typeOfAsset) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset type is required",
        });
        return;
      }

      switch (typeOfAsset) {
        case "venue":
          await this._adminVenueController.venueFullDetails(req, res);
          break;
        case "rentcar":
          await this._adminRentCarController.carFullDetails(req, res);
          break;
        case "studio":
          await this._adminStudioController.studioFullDetails(req, res);
          break;
        case "caters":
          await this._adminCatersController.catersFullDetails(req, res);
          break;
        default:
          res.status(statusCodes.forbidden).json({
            success: false,
            message: `Unknown type of asset '${typeOfAsset}'`,
          });
      }
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : statusMessages.serverError,
      });
    }
  }

  async approveAsset(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { assetStatus, type } = req.query;
      const id = req.params.assetId;

      if (!type || !assetStatus) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset type and status are required.",
        });
        return;
      }

      const result = await this._adminAssetManagementUseCase.assetApprove(
        id,
        String(type),
        String(assetStatus)
      );

      if (result && result.hostId) {
        await this._adminNotificationUseCase.createNotification({
          createrId: req.auth!.id,
          receiverId: result.hostId,
          assetId: result._id,
          assetType: String(type) as any,
          status: "approved",
          message: `Your ${type} has been approved.`,
        });
        const io = getIO();
        io.to(`host-${result.hostId}`).emit("new-notification", {
          assetId: result._id,
          assetType: type,
          status: "approved",
          message: `Your ${type} has been approved.`,
          createdAt: new Date(),
        });
      }

      res
        .status(statusCodes.Success)
        .json({ success: true, message: "Asset approved successfully" });
    } catch (error) {
      logger.error(error);
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to approve asset",
      });
    }
  }

  async rejectAsset(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { assetStatus, type, reason } = req.query;
      const id = req.params.assetId;
      if (!type || !assetStatus || !reason) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset type or status or reason are required.",
        });
        return;
      }

      const result = await this._adminAssetManagementUseCase.assetReject(
        id,
        String(type),
        String(assetStatus),
        String(reason)
      );

      if (result && result.hostId) {
        await this._adminNotificationUseCase.createNotification({
          createrId: req.auth!.id,
          receiverId: result.hostId,
          assetId: result._id,
          assetType: String(type) as any,
          status: "rejected",
          message: `Your ${type} has been rejected.`,
        });
        const io = getIO();
        io.to(`host-${result.hostId}`).emit("new-notification", {
          assetId: result._id,
          assetType: type,
          status: "rejected",
          message: `Your ${type} has been rejected.`,
          createdAt: new Date(),
        });
      }

      if (result) {
        res
          .status(statusCodes.Success)
          .json({ success: true, message: "Asset rejected successfully" });
      } else {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Asset not found or update failed",
        });
      }
    } catch (error) {
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to reject asset",
      });
    }
  }
}
