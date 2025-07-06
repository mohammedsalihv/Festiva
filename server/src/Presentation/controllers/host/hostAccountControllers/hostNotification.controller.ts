import { Request, Response } from "express";
import { IHostNotificationUseCase } from "../../../../domain/usecaseInterface/host/interface.hostNotificationUseCase";
import { IHostNotificationController } from "../../../../domain/controlInterface/common/account controller interface/interface.hostNotificationController";

export class HostNotificationController implements IHostNotificationController {
  constructor(private hostNofificationUseCase: IHostNotificationUseCase) {}

  async getNotifications(req: Request, res: Response) {
    try {
      const hostId = req.params.hostId;
      const notifications =
        await this.hostNofificationUseCase.getNotificationsByUser(hostId);
      res.status(200).json(notifications);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch notifications" });
    }
  }
}
