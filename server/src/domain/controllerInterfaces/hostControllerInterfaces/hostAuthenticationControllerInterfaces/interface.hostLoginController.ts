import { Request, Response } from "express";

export interface IHostLoginController {
  hostLogin(req: Request, res: Response): Promise<Response | void>;
}
