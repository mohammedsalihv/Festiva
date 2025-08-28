import { Response } from "express";
import { IHostBookingsController } from "../../../../domain/controlInterface/common/account/interface.hostBookingsController";
import { authenticationRequest } from "../../../../domain/controlInterface/common/authentication/authRequest";
import { IHostBookingsUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostBookingsUseCase";
import { statusCodes } from "../../../../utils/common/messages/constantResponses";

export class HostBookingController implements IHostBookingsController {
  constructor(private _hostBookingsUseCase: IHostBookingsUseCase) {}

  async getAllBookings(
    req: authenticationRequest,
    res: Response
  ): Promise<void> {
    try {
      const hostId = req.auth!.id;
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
}
