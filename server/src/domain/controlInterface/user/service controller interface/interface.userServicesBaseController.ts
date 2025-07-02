import { Request, Response } from "express";

export interface IUserServicesBaseController {
  getServiceDetails(req: Request, res: Response): Promise<void>;
}
