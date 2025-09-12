import { Request, Response } from "express";

export interface IHostNotificationController {
  getAllNotifications(req: Request, res: Response): Promise<void>;
  markAllRead(req: Request, res: Response): Promise<void>;
}
