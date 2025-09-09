import { Request, Response } from "express";
import { authenticationRequest } from "../authentication/authRequest";

export interface IHostDashboardController {
  getHostDashboard(req: authenticationRequest, res: Response): Promise<void>;
}
