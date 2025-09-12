import { Request, Response } from "express";
import { authenticationRequest } from "../baseAuthenticationInterfaces/authRequest";

export interface IHostBookingsController {
  getAllBookings(req: authenticationRequest, res: Response): Promise<void>;
  updateBookingsStatus(req: authenticationRequest, res: Response): Promise<void>;
}
