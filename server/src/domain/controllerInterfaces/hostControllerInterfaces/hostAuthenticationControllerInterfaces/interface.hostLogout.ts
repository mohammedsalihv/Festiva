import { Request, Response } from "express";

export interface IHostLogoutController {
  hostLogout(req: Request, res: Response): Promise<Response>;
}
