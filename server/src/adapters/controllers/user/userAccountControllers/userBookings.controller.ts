import {Response } from "express";
import { IUserBookingsController } from "../../../../domain/controllerInterfaces/userControllerInterfaces/userAccountControllerInterfaces/interface.userBookingsController";
import { IUserBookingUseCase } from "../../../../domain/usecaseInterfaces/userUsecaseInterfaces/userProfileUsecaseInterfaces/interface.userBookingsUseCase";
import { authenticationRequest } from "../../../../domain/controllerInterfaces/baseControllerInterfaces/baseAuthenticationInterfaces/authRequest";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/baseUtilities/messages/constantResponses";

export class UserBookingsController implements IUserBookingsController {
  constructor(private _userBookingsUsecase: IUserBookingUseCase) {}

  async getMyBookings(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.auth!.id;
      if (!userId) {
        res.status(statusCodes.forbidden).json(statusMessages.unAuthorized);
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = req.query.sortBy as string;
      const searchBy = req.query.searchBy as string;
      const tabBy = req.query.tabBy as string;

      const { bookings, totalPages } =
        await this._userBookingsUsecase.allBookings(
          userId,
          page,
          limit,
          sortBy,
          searchBy,
          tabBy
        );

      res.status(statusCodes.Success).json({ bookings, totalPages });
    } catch (error) {
      console.error("Error fetching all bookings:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch all bookings" });
    }
  }
  
  async getBookingDetails(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const userId = req.auth!.id;
      if (!userId) {
        res.status(statusCodes.forbidden).json(statusMessages.unAuthorized);
        return;
      }
      const { bookingId } = req.params
      const details = await this._userBookingsUsecase.bookingDetails(bookingId);
      res.status(statusCodes.Success).json(details);
    } catch (error) {
      console.error("Error fetching booking details:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch booking details" });
    }
  }
}
