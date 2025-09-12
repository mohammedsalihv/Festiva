import { Request, Response } from "express";

export interface IHostGoogleSignupController {
  googleSignup(req: Request, res: Response): Promise<Response | void>;
}
