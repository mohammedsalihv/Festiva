import { Request, Response } from "express";

export interface IHostCatersController {
  addCatersService(req: Request, res: Response): Promise<void>;
  catersFullDetails(req: Request, res: Response): Promise<void>;
  requestReApproval(req: Request, res: Response): Promise<void>;
}
