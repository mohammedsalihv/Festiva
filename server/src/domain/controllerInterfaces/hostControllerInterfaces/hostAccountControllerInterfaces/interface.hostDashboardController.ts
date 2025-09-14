import { Request, Response } from "express";
import { authenticationRequest } from "../../baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";

export interface IHostDashboardController {
  getHostDashboard(req: authenticationRequest, res: Response): Promise<void>;
}
