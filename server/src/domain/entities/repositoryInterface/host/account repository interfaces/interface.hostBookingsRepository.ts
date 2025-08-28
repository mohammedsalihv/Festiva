import { IBooking } from "../../../modelInterface/base/interface.booking";

export interface IHostBookingsRepository {
  getAllBookings(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{
    bookings: IBooking[];
    totalPages: number;
  }>;
  updateStatus(
    bookingId: string,
    status: string,
    reason?: string
  ): Promise<boolean>;
}
