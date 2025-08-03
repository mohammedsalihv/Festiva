import { Request, Response } from "express";

export interface IUserSignupController {
  signupByUser(req: Request, res: Response): Promise<void>;
}
