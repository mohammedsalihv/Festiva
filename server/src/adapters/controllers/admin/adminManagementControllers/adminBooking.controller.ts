import { IAdminBookingManagementController } from "../../../../domain/controlInterface/admin/management controller interfaces/interface.adminBookingManagementController";
import { authenticationRequest } from "../../../../domain/controlInterface/common/authentication/authRequest";
import { IAdminBookingManagementUseCase } from "../../../../domain/usecaseInterface/admin/managementUsecaseInterfaces/interface.adminBookingManagementUseCase";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { Response } from "express";

export class AdminBookingManagementController
  implements IAdminBookingManagementController
{
  constructor(
    private _adminBookingManagementUsecase: IAdminBookingManagementUseCase
  ) {}

  async getAllBookings(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const adminId = req.auth!.id;
      if (!adminId) {
        res.status(statusCodes.forbidden).json(statusMessages.unAuthorized);
        return;
      }

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const sortBy = req.query.sortBy as string;
      const searchBy = req.query.searchBy as string;
      const tabBy = req.query.tabBy as string;

      const { booking, totalPages } =
        await this._adminBookingManagementUsecase.allBookings(
          page,
          limit,
          sortBy,
          searchBy,
          tabBy
        );

      res.status(statusCodes.Success).json({ bookings: booking, totalPages });
    } catch (error) {
      console.error("Error fetching all bookings:", error);
      res
        .status(statusCodes.serverError)
        .json({ message: "Failed to fetch all bookings" });
    }
  }
}
