import { Request, Response } from "express";

export interface IAdminRentCarController {
  carFullDetails(req: Request, res: Response): Promise<void>;
}
