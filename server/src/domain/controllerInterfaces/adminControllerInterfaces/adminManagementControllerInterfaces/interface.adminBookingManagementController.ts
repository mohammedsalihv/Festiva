import { Response } from "express";
import { authenticationRequest } from "../../baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";

export interface IAdminBookingManagementController {
  getAllBookings(req: authenticationRequest, res: Response): Promise<void>;
}
