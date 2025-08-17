import { IBooking } from "../../modelInterface/base/interface.booking";

export interface IBookingRepository {
  createBooking(booking: IBooking): Promise<IBooking>;
  getBookingById(bookingId: string): Promise<IBooking | null>;
  updateBookingStatus(
    bookingId: string,
    status: "pending" | "confirmed" | "cancelled"
  ): Promise<IBooking | null>;
  getBookingsByUser(userId: string): Promise<IBooking[]>;
}
