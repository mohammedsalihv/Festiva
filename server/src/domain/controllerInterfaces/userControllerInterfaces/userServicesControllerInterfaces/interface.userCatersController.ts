import { Request, Response } from "express";
import { Types } from "mongoose";

export interface IUserCatersController {
  getCaters(req: Request, res: Response): Promise<void>;
  getCatersDetails(req: Request, res: Response): Promise<void>;
  filterCaters(req: Request, res: Response): Promise<void>;
  sortCaters(req: Request, res: Response): Promise<void>;
  getHostId(assetId: string): Promise<Types.ObjectId>;
}
