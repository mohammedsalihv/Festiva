import { Request, Response } from "express";
import { Types } from "mongoose";

export interface IUserVenueController {
  getVenues(req: Request, res: Response): Promise<void>;
  getVenueDetails(req: Request, res: Response): Promise<void>;
  filterVenues(req: Request, res: Response): Promise<void>;
  sortVenues(req: Request, res: Response): Promise<void>;
  getHostId(assetId: string): Promise<Types.ObjectId>;
}
