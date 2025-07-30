import { Request, Response } from "express";

export interface IHostCatersController {
  addCatersService(req: Request, res: Response): Promise<void>;
  catersFullDetails(req: Request, res: Response): Promise<void>;
  requestReApproval(req: Request, res: Response): Promise<void>;
  Unavailable(req: Request, res: Response): Promise<void>;
  deleteRequest(req: Request, res: Response): Promise<void>;
}
