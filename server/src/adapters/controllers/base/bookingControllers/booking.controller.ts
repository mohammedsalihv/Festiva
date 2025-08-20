import { Request, Response } from "express";
import { IBookingController } from "../../../../domain/controlInterface/common/booking/interface.bookingController";
import { IBookingUseCase } from "../../../../domain/usecaseInterface/base/booking/interface.bookingUsecase";
import { IBooking } from "../../../../domain/entities/modelInterface/base/interface.booking";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";

export class BookingController implements IBookingController {
  constructor(private _bookingUseCase: IBookingUseCase) {}

  async createBooking(req: Request, res: Response): Promise<void> {
    try {
      const booking: IBooking = req.body;
      if (!booking || !booking.userId || !booking.assetType) {
        res.status(statusCodes.badRequest).json({
          success: false,
          message: "Required booking fields are missing",
        });
        return;
      }

      const newBooking = await this._bookingUseCase.createBooking(booking);

      res.status(statusCodes.Success).json({
        success: true,
        message: "Booking created successfully",
        data: newBooking,
      });
    } catch (error: any) {
      logger.error("Create booking error:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }

  async getBooking(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "Booking ID is required",
      });
      return;
    }

    try {
      const booking = await this._bookingUseCase.getBooking(id);

      if (!booking) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "Booking not found",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        data: booking,
      });
    } catch (error: any) {
      logger.error("Get booking error:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }

  async confirmBooking(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "Booking ID is required",
      });
      return;
    }

    try {
      const booking = await this._bookingUseCase.confirmBooking(id);

      if (!booking) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "Booking not found",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Booking confirmed",
        data: booking,
      });
    } catch (error: any) {
      logger.error("Confirm booking error:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }

  async cancelBooking(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    if (!id) {
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "Booking ID is required",
      });
      return;
    }

    try {
      const booking = await this._bookingUseCase.cancelBooking(id);

      if (!booking) {
        res.status(statusCodes.notfound).json({
          success: false,
          message: "Booking not found",
        });
        return;
      }

      res.status(statusCodes.Success).json({
        success: true,
        message: "Booking canceled",
        data: booking,
      });
    } catch (error: any) {
      logger.error("Cancel booking error:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }

  async getUserBookings(req: Request, res: Response): Promise<void> {
    const { userId } = req.params;

    if (!userId) {
      res.status(statusCodes.forbidden).json({
        success: false,
        message: "User ID is required",
      });
      return;
    }

    try {
      const bookings = await this._bookingUseCase.getUserBookings(userId);

      res.status(statusCodes.Success).json({
        success: true,
        data: bookings,
      });
    } catch (error: any) {
      logger.error("Get user bookings error:", error);
      res.status(statusCodes.serverError).json({
        success: false,
        message: error.message || statusMessages.serverError,
      });
    }
  }
}
