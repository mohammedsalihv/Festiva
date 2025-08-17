import { IBooking } from "../../../entities/modelInterface/base/interface.booking";

export interface IBookingUseCase {
  createBooking(booking: IBooking): Promise<IBooking>;
  getBooking(bookingId: string): Promise<IBooking | null>;
  confirmBooking(bookingId: string): Promise<IBooking | null>;
  cancelBooking(bookingId: string): Promise<IBooking | null>;
  getUserBookings(userId: string): Promise<IBooking[]>;
}
