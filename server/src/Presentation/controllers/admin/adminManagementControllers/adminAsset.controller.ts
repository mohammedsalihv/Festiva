import { Request, Response } from "express";
import { AdminAssetManagementUseCase } from "../../../../application/use-cases/admin/adminManagement/usecase.adminAssetManagement";
import { AdminVenueController } from "../adminServiceControllers/AdminVenue.controller";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class AdminAssetsController {
  constructor(
    private adminAssetManagementUseCase: AdminAssetManagementUseCase,
    private AdminVenueController: AdminVenueController
  ) {}

  async Assets(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.params.typeOfAsset;
      const assets = await this.adminAssetManagementUseCase.execute(
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
          await this.AdminVenueController.venueDetails(req, res);
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

  async approveAsset(req: Request, res: Response): Promise<void> {
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

      const result = await this.adminAssetManagementUseCase.assetApprove(
        id,
        String(type),
        String(assetStatus)
      );
      if (result) {
        res
          .status(statusCodes.Success)
          .json({ success: true, message: "Asset approved successfully" });
      }
    } catch (error) {
      logger.error(error);
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to approve asset",
      });
    }
  }

  async rejectAsset(req: Request, res: Response): Promise<void> {
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

      const result = await this.adminAssetManagementUseCase.assetReject(
        id,
        String(type),
        String(assetStatus)
      );
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
