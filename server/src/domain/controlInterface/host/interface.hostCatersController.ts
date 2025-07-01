import { Request, Response } from "express";

export interface IHostCatersController {
  addCatersService(req: Request, res: Response): Promise<void>;
}
