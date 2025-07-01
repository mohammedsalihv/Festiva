import { Request, Response } from "express";

export interface IUserCatersController {
  getCaters(req: Request, res: Response): Promise<void>;
}
