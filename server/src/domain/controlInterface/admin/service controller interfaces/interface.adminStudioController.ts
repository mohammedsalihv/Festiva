import { Request, Response } from "express";

export interface IAdminStudioController {
  studioFullDetails(req: Request, res: Response): Promise<void>;
}
