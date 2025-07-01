import { Request, Response } from "express";

export interface IHostRentCarController {
  addRentCarService(req: Request, res: Response): Promise<void>;
}
