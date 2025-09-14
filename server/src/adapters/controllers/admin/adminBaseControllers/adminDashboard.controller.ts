import { Response } from "express";
import { IAdminDashboardController } from "../../../../domain/controllerInterfaces/adminControllerInterfaces/adminDashboardControllerInterfaces/interface.adminDashboardController";
import { authenticationRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";
import { IAdminDashboardUseCase } from "../../../../domain/usecaseInterfaces/adminUsecaseInterfaces/adminBaseUsecaseInterfaces/interface.adminDashboardUseCase";
import { statusCodes } from "../../../../utils/baseUtilities/messages/constantResponses";

export class AdminDashboardController implements IAdminDashboardController {
  constructor(private _adminDashboardUsecase: IAdminDashboardUseCase) {}

  async getDashboard(req: authenticationRequest, res: Response): Promise<void> {
    try {
      const DashboardData = await this._adminDashboardUsecase.adminDashboard();
      res.status(statusCodes.Success).json(DashboardData);
    } catch (error) {
      console.error("Error fetching admin dashboard data:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch admin dashboard data." });
    }
  }
}
