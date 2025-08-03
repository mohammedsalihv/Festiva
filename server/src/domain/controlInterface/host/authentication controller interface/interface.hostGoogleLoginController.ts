import { Request, Response } from "express";

export interface IHostGoogleLoginController {
  googleLogin(req: Request, res: Response): Promise<Response | void>;
}
