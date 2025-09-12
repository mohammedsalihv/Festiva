import { Request, Response } from "express";
import { authenticateToken } from "../../../../utils/baseUtilities/middlewares/auth";

export interface IHostCatersController {
  addCatersService(req: Request, res: Response): Promise<void>;
  catersFullDetails(req: Request, res: Response): Promise<void>;
  requestReApproval(req: Request, res: Response): Promise<void>;
  availability(req: Request, res: Response): Promise<void>;
  deleteRequest(req: Request, res: Response): Promise<void>;
}
