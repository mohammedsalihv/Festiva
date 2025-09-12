import { Request, Response } from "express";

export interface IUserLogoutController {
  userLogout(req: Request, res: Response): Promise<Response>;
}
