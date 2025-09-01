import { Response } from "express";
import { authenticationRequest } from "../../common/authentication/authRequest";

export interface IUserBookingsController {
  getMyBookings(req: authenticationRequest, res: Response): Promise<void>;
  getBookingDetails(req: authenticationRequest, res: Response): Promise<void>;
}
