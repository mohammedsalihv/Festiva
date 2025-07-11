import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { HostNotificationUseCase } from "../../../../application/use-cases/host/host account/usecase.hostNotification";
import { IHostNotificationController } from "../../../../domain/controlInterface/common/account controller interface/interface.hostNotificationController";

interface AuthRequest extends Request {
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostNotificationController implements IHostNotificationController {
  constructor(private hostNotificationUseCase: HostNotificationUseCase) {}

  async getAllNotifications(req: AuthRequest, res: Response) {
    try {
      const receiverId = req.auth!.id;
      const notifications =
        await this.hostNotificationUseCase.getNotifications(receiverId);
      res.status(200).json({ success: true, data: notifications });
    } catch (error) {
      console.error("Notification error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch notifications" });
    }
  }
}
