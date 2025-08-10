import { Request, Response } from "express";
import { AuthRequest } from "../../common/authentication/authType";

export interface IUserController {
  resetPassword(req: Request, res: Response): Promise<void>;
  profileImage(req: AuthRequest, res: Response): Promise<void>;
}
