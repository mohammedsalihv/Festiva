import { Request, Response } from "express";

export interface IHostStudioController {
  addStudioService(req: Request, res: Response): Promise<void>;
  studioFullDetails(req: Request, res: Response): Promise<void>;
  requestReApproval(req: Request, res: Response): Promise<void>;
  availability(req: Request, res: Response): Promise<void>;
  deleteRequest(req: Request, res: Response): Promise<void>;
}
