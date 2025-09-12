import { Request, Response } from "express";
import { authenticationRequest } from "../../baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";

export interface IAdminDashboardController {
  getDashboard(req: authenticationRequest, res: Response): Promise<void>;
}
