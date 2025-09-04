import { Request, Response } from "express";
import { authenticationRequest } from "../../common/authentication/authRequest";

export interface IAdminDashboardController {
  getDashboard(req: authenticationRequest, res: Response): Promise<void>;
}
