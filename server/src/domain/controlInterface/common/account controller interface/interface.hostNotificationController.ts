import { Request, Response } from "express";

export interface IHostNotificationController {
  getAllNotifications(req: Request, res: Response): Promise<void>;
}
