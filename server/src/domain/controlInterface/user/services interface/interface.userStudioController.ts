import { Request, Response } from "express";

export interface IUserStudioController {
  getStudios(req: Request, res: Response): Promise<void>;
  getStudioDetails(req: Request, res: Response): Promise<void>;
  filterStudios(req: Request, res: Response): Promise<void>;
}
