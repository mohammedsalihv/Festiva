import { Request, Response } from "express";

export interface IUserGoogleLoginController {
  userLogin(req: Request, res: Response): Promise<void>;
}
