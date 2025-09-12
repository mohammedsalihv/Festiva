import { Response } from "express";
import { IHostBookingsController } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/account/interface.hostBookingsController";
import { authenticationRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";
import { IHostBookingsUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostBookingsUseCase";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";
import logger from "../../../../utils/baseUtilities/messages/logger";

export class HostBookingController implements IHostBookingsController {
  constructor(private _hostBookingsUseCase: IHostBookingsUseCase) {}

  async getAllBookings(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth!.id;

      if (!hostId) {
        res.status(statusCodes.forbidden).json(statusMessages.unAuthorized);
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const status = req.query.status as string | undefined;

      const { bookings, totalPages } =
        await this._hostBookingsUseCase.recivedBookings(
          hostId,
          page,
          limit,
          status
        );

      res.status(statusCodes.Success).json({ bookings, totalPages });
    } catch (error) {
      console.error("Error fetching all bookings:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch all bookings" });
    }
  }

  async updateBookingsStatus(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const { status, reason } = req.query;
      const id = req.params.bookingId;
      const hostId = req.auth!.id;

      if (!hostId) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: statusMessages.unAuthorized,
        });
        return;
      }

      if (!status || !id) {
        res.status(statusCodes.forbidden).json({
          success: false,
          message: "Booking id and status are required.",
        });
        return;
      }

      await this._hostBookingsUseCase.changeStatus(
        id,
        String(status),
        String(reason)
      );

      res
        .status(statusCodes.Success)
        .json({ success: true, message: "Booking status changed" });
    } catch (error) {
      logger.error(error);
      res.status(statusCodes.serverError).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to change the booking status",
      });
    }
  }
}
