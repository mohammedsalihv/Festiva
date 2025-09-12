import { Request, Response } from "express";

export interface IAdminLoginController {
  adminLogin(req: Request, res: Response): Promise<Response | void>;
}
