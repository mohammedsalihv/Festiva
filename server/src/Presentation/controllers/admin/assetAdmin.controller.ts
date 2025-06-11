import { Request, Response } from "express";
import { AssetManagementUseCase } from "../../../application/use-cases/admin/AssetManagement.usecase";
import { AdminVenueController } from "./AdminVenue.controller";

export class AssetAdminController {
  constructor(
    private useCase: AssetManagementUseCase,
    private venueController: AdminVenueController
  ) {}

  async Assets(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.params.typeOfAsset;
      const assets = await this.useCase.execute(typeOfAsset);
      res.status(200).json({
        success: true,
        message: "Assets fetched successfully",
        data: assets,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch assets",
      });
    }
  }

  async assetDetails(req: Request, res: Response): Promise<void> {
    try {
      const typeOfAsset = req.query.type?.toString().toLowerCase();
      if (!typeOfAsset) {
        res.status(400).json({
          success: false,
          message: "Asset type is required",
        });
        return;
      }

      switch (typeOfAsset) {
        case "venue":
          await this.venueController.venueDetails(req, res);
          break;
        default:
          res.status(400).json({
            success: false,
            message: `Unknown type of asset '${typeOfAsset}'`,
          });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch asset full details",
      });
    }
  }

  async approveAsset(req: Request, res: Response): Promise<void> {
  try {
    const { assetStatus, type } = req.query;
    const { id } = req.params;

    if (!type || !assetStatus) {
      res.status(400).json({
        success: false,
        message: "Asset type and status are required.",
      });
      return;
    }

    const result = await this.useCase.assetApprove(id, String(type), String(assetStatus));
    if (result) {
      res.status(200).json({ success: true, message: "Asset approved successfully" });
    } else {
      res.status(400).json({ success: false, message: "Asset not found or update failed" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to approve asset",
    });
  }
}

async rejectAsset(req: Request, res: Response): Promise<void> {
  try {
    const { assetStatus, type } = req.query;
    const  id  = req.params.assetId;

    if (!type || !assetStatus) {
      res.status(400).json({
        success: false,
        message: "Asset type and status are required.",
      });
      return;
    }

    const result = await this.useCase.assetReject(id, String(type), String(assetStatus));
    if (result) {
      res.status(200).json({ success: true, message: "Asset rejected successfully" });
    } else {
      res.status(400).json({ success: false, message: "Asset not found or update failed" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : "Failed to reject asset",
    });
  }
}

}
