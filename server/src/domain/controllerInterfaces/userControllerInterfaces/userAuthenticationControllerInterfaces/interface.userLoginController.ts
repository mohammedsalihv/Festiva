import { Request, Response } from "express";

export interface IUserLoginController {
  loginByUser(req: Request, res: Response): Promise<Response | void>;
}
