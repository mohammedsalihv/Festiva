import { IBooking } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.booking";

export interface IHostBookingsUseCase {
  recivedBookings(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ bookings: IBooking[]; totalPages: number }>;
  changeStatus(
    bookingId: string,
    status: string,
    reason?: string
  ): Promise<boolean>;
}
