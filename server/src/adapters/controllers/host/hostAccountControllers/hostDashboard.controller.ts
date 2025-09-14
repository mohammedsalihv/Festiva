import { Response } from "express";
import { IHostDashboardController } from "../../../../domain/controllerInterfaces/hostControllerInterfaces/hostAccountControllerInterfaces/interface.hostDashboardController";
import { IHostDashboardUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAccountUsecaseInterfaces/interface.hostDashboardUseCase";
import { authenticationRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";

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
      res.status(statusCodes.Success).json(hostDashboard);
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch dashboard" });
    }
  }
}
