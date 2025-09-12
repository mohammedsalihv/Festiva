import { Request, Response } from "express";

export interface IHostController {
  mailValidation(req: Request, res: Response): Promise<void>;
}
