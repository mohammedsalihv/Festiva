import { Request, Response } from "express";

export interface IUserServicesBaseController {
  getServiceDetails(req: Request, res: Response): Promise<void>;
  filterAssets(req: Request, res: Response): Promise<void>;
  sortAssets(req: Request, res: Response): Promise<void>;
}
