import { Request, Response } from "express";

export interface IOTPController {
  otpSending(req: Request, res: Response): Promise<void>;
  otpVerification(req: Request, res: Response): Promise<void>;
  otpDeleting(req: Request, res: Response): Promise<void>;
}
