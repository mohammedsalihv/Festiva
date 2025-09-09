import { Response } from "express";
import { IAdminDashboardController } from "../../../../domain/controlInterface/admin/adminDashboardControllerInterfaces/interface.adminDashboardController";
import { authenticationRequest } from "../../../../domain/controlInterface/common/authentication/authRequest";
import { IAdminDashboardUseCase } from "../../../../domain/usecaseInterface/admin/adminBaseUsecaseInterfaces/interface.adminDashboardUseCase";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

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
