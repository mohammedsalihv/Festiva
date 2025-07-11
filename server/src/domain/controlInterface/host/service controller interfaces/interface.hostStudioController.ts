import { Request, Response } from "express";

export interface IHostStudioController {
  addStudioService(req: Request, res: Response): Promise<void>;
}
