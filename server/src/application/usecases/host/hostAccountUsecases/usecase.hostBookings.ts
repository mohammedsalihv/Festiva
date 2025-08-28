import { IBooking } from "../../../../domain/entities/modelInterface/base/interface.booking";
import { IHostBookingsUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostBookingsUseCase";
import { IHostBookingsRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostBookingsRepository";

export class HostBookingsUseCase implements IHostBookingsUseCase {
  constructor(private _hostBookingsRepository: IHostBookingsRepository) {}

  async recivedBookings(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ bookings: IBooking[]; totalPages: number }> {
    return await this._hostBookingsRepository.getAllBookings(
      hostId,
      page,
      limit,
      status
    );
  }
  async changeStatus(
    bookingId: string,
    status: string,
    reason?: string
  ): Promise<boolean> {
    return await this._hostBookingsRepository.updateStatus(
      bookingId,
      status,
      reason
    );
  }
}
