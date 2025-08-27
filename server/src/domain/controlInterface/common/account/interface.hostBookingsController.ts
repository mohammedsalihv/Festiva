import { Request, Response } from "express";
import { authenticationRequest } from "../authentication/authRequest";

export interface IHostBookingsController {
  getAllBookings(req: authenticationRequest, res: Response): Promise<void>;
}
