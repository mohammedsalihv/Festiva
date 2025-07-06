import { Request, Response } from "express";

export interface IHostNotificationController {
  getNotifications(req: Request, res: Response): Promise<void>;
}
