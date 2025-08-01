import { Request, Response } from "express";

export interface IHostSignupController {
  signupNewHost(req: Request, res: Response): Promise<void>;
}
