import { Request, Response } from "express";
import { Types } from "mongoose";
export interface IUserRentCarController {
  getRentCars(req: Request, res: Response): Promise<void>;
  getRentCarDetails(req: Request, res: Response): Promise<void>;
  filterRentCars(req: Request, res: Response): Promise<void>;
  sortRentCars(req: Request, res: Response): Promise<void>;
  getHostId(assetId: string): Promise<Types.ObjectId>;
}
