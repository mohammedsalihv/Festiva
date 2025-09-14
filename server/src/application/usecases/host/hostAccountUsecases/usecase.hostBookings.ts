import { IBooking } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.booking";
import { IHostBookingsUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAccountUsecaseInterfaces/interface.hostBookingsUseCase";
import { IHostBookingsRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAccountRepositoryInterfaces/interface.hostBookingsRepository";

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
