import { Request, Response } from "express";

export interface IUserRentCarController {
  getRentCars(req: Request, res: Response): Promise<void>;
  getRentCarDetails(req: Request, res: Response): Promise<void>;
  filterRentCars(req: Request, res: Response): Promise<void>;

}
