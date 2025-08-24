import { Request, Response } from "express";
import { Types } from "mongoose";

export interface IUserStudioController {
  getStudios(req: Request, res: Response): Promise<void>;
  getStudioDetails(req: Request, res: Response): Promise<void>;
  filterStudios(req: Request, res: Response): Promise<void>;
  sortStudios(req: Request, res: Response): Promise<void>;
  getHostId(assetId: string): Promise<Types.ObjectId>;
}
