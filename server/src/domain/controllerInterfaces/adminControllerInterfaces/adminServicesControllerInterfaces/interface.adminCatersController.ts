import { Request, Response } from "express";

export interface IAdminCatersController {
  catersFullDetails(req: Request, res: Response): Promise<void>;
}
