import { Request, Response } from "express";

export interface IAdminAssetManagementController {
  Assets(req: Request, res: Response): Promise<void>;
  assetDetails(req: Request, res: Response): Promise<void>;
  approveAsset(req: Request, res: Response): Promise<void>;
  rejectAsset(req: Request, res: Response): Promise<void>;
}
