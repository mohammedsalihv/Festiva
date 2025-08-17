
import { Request, Response } from "express";

export interface IBookingController {
  createBooking(req: Request, res: Response): Promise<void>;
  getBooking(req: Request, res: Response): Promise<void>;
  confirmBooking(req: Request, res: Response): Promise<void>;
  cancelBooking(req: Request, res: Response): Promise<void>;
  getUserBookings(req: Request, res: Response): Promise<void>;
}
