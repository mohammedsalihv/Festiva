import { Request, Response } from "express";

export interface IRefreshTokenController {
  refreshAccessToken(req: Request, res: Response): Promise<void>;
}
