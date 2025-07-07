import { Request, Response } from "express";

export interface IHostAssetRequestController {
  getAllRequests(req: Request, res: Response): Promise<void>;
}

