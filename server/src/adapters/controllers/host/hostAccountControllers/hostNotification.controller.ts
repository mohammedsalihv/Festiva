import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { IHostNotificationUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostNotificationUseCase";
import { IHostNotificationController } from "../../../../domain/controlInterface/host/account controller interfaces/interface.hostNotificationController";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

interface AuthRequest extends Request {
  auth?: JwtPayload & { id: string; role?: string };
}

export class HostNotificationController implements IHostNotificationController {
  constructor(private hostNotificationUseCase: IHostNotificationUseCase) {}

  async getAllNotifications(req: AuthRequest, res: Response) {
    try {
      const receiverId = req.auth!.id;
      const notifications = await this.hostNotificationUseCase.getNotifications(
        receiverId
      );
      res
        .status(statusCodes.Success)
        .json({ success: true, data: notifications });
    } catch (error) {
      console.error("Notification error:", error);
      res
        .status(statusCodes.serverError)
        .json({ success: false, message: "Failed to fetch notifications" });
    }
  }
  async markAllRead(req: AuthRequest, res: Response): Promise<void> {
    try {
      const hostId = req.auth!.id;
      await this.hostNotificationUseCase.markAllNotifications(hostId);

      res.status(statusCodes.Success).json({
        success: true,
        message: "All notifications marked as read",
      });
    } catch (error) {
      console.error("Error marking notifications as read:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message: "Failed to mark notifications as read",
      });
    }
  }
}
