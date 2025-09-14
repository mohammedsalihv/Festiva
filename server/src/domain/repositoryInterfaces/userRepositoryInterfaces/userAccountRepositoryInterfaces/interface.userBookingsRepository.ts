import { IBooking } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.booking";
export interface IUserBookingsRepository {
  findBookings(
    userId: string,
    skip: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ bookings: IBooking[]; total: number }>;

  findBookingDetails(bookingId: string): Promise<IBooking | null>;
}
