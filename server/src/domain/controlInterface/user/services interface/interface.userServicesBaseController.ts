import { Request, Response } from "express";
import { Types } from "mongoose";

export interface IUserServicesBaseController {
  getServiceDetails(req: Request, res: Response): Promise<void>;
  filterAssets(req: Request, res: Response): Promise<void>;
  sortAssets(req: Request, res: Response): Promise<void>;
  reviewReceiver(assetType: string, assetId: string): Promise<Types.ObjectId | string>;
}
