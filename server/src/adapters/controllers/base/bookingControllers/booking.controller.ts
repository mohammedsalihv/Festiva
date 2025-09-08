import { Request, Response } from "express";
import { IBookingController } from "../../../../domain/controlInterface/common/booking/interface.bookingController";
import { IBookingUseCase } from "../../../../domain/usecaseInterface/base/booking/interface.bookingUsecase";
import { IBooking } from "../../../../domain/entities/modelInterface/base/interface.booking";
import logger from "../../../../utils/common/messages/logger";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { IHostNotificationUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostNotificationUseCase";
import { getIO } from "../../../../config/socket";
import { IPaymentUseCase } from "../../../../domain/usecaseInterface/base/payment/interface.paymentUsecase";

export class BookingController implements IBookingController {
  constructor(
    private _bookingUseCase: IBookingUseCase,
    private _hostNotificationUseCase: IHostNotificationUseCase,
    private _paymentUsecase: IPaymentUseCase
  ) {}

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

      if (newBooking.paymentId && newBooking._id) {
        await this._paymentUsecase.updateBookingDetails(
          newBooking.paymentId,
          newBooking._id
        );
      }

      if (newBooking && newBooking.bookedData.host?._id) {
        await this._hostNotificationUseCase.createNotification({
          createrId: booking.userId,
          receiverId: newBooking.bookedData.host?._id,
          assetId: newBooking.assetId,
          assetType: booking.assetType,
          status: "created",
          message: `Your ${booking.assetType} has received a new booking.`,
        });

        const io = getIO();
        io.to(`host-${newBooking.bookedData.host?._id}`).emit(
          "new-notification",
          {
            assetId: newBooking.assetId,
            assetType: booking.assetType,
            status: "Created",
            message: `Your ${booking.assetType} has received a new booking.`,
            createdAt: new Date(),
          }
        );
      }

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
