import { Request, Response } from "express";
import { AssetManagementUseCase } from "../../../application/use-cases/admin/assetManagement.usecase";
import logger from "../../../utils/logger";

export class AssetAdminController {
  constructor(private assetManagementUseCase: AssetManagementUseCase) {}

  async AllAssets(req: Request, res: Response): Promise<void> {
    try {

      const typeOfAsset = req.params.typeOfAsset
      const allAssets = await this.assetManagementUseCase.execute(typeOfAsset);
      res.status(200).json({
        message: "Assets fetched successfully",
        success: true,
        data: allAssets,
      });
    } catch (error) {
      logger.error(String(error), "Error fetching all assets");
      res.status(500).json({
        success: false,
        message: "Assets empty",
      });
    }
  }
}
