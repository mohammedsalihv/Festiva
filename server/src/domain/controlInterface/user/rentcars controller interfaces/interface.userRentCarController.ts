import { Request, Response } from "express";

export interface IUserRentCarController {
  getRentCars(req: Request, res: Response): Promise<void>;
}
