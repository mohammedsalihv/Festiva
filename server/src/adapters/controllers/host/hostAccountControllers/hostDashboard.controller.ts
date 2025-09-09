import { Response } from "express";
import { IHostDashboardController } from "../../../../domain/controlInterface/common/account/interface.hostDashboardController";
import { IHostDashboardUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostDashboardUseCase";
import { authenticationRequest } from "../../../../domain/controlInterface/common/authentication/authRequest";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class HostDashboardController implements IHostDashboardController {
  constructor(private _hostDashboardUsecase: IHostDashboardUseCase) {}

  async getHostDashboard(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth!.id;

      if (!hostId) {
        res.status(statusCodes.forbidden).json(statusMessages.unAuthorized);
        return;
      }

      const hostDashboard = await this._hostDashboardUsecase.dashboard(hostId);
      console.log(hostDashboard)
      res.status(statusCodes.Success).json(hostDashboard);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch dashboard" });
    }
  }
}
