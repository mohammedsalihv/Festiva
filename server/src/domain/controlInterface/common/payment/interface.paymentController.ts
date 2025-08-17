import { Request, Response } from "express";

export interface IPaymentController {
  startPayment(req: Request, res: Response): Promise<void>;
  finishPayment?(req: Request, res: Response): Promise<void>;
  webhook?(req: Request, res: Response): Promise<void>;
}
