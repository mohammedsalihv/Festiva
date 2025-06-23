import { Request, Response } from "express";

export interface IHostRentCarController {
  addRentCar(req: Request, res: Response): Promise<void>;
}
