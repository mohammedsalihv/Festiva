import { Response } from "express";
import { authenticationRequest } from "../../common/authentication/authRequest";

export interface IAdminBookingManagementController {
  getAllBookings(req: authenticationRequest, res: Response): Promise<void>;
}
