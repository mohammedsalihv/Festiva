import { IBookingRepository } from "../../../../domain/entities/repositoryInterface/base/interface.bookingRepository";
import { IBooking } from "../../../../domain/entities/modelInterface/base/interface.booking";
import bookingModel from "../../../../domain/models/base/booking/bookingModel";

export class BookingRepository implements IBookingRepository {
  async createBooking(booking: IBooking): Promise<IBooking> {
    const doc = await bookingModel.create(booking);
    return doc.toObject();
  }

  async getBookingById(bookingId: string): Promise<IBooking | null> {
    return bookingModel.findById(bookingId).lean();
  }

  async updateBookingStatus(
    bookingId: string,
    status: "pending" | "confirmed" | "cancelled"
  ): Promise<IBooking | null> {
    return bookingModel
      .findByIdAndUpdate(bookingId, { status }, { new: true })
      .lean();
  }

  async getBookingsByUser(userId: string): Promise<IBooking[]> {
    return bookingModel.find({ userId }).lean();
  }
}
