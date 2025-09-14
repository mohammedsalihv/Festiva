import { IBookingUseCase } from "../../../../domain/usecaseInterfaces/baseUsecaseInterfaces/baseBookingUsecaseInterfaces/interface.bookingUsecase";
import { IBookingRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/baseServicesRepositoryInterfaces/interface.bookingRepository";
import { IBooking } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.booking";

export class BookingUseCase implements IBookingUseCase {
  constructor(private _bookingRepository: IBookingRepository) {}

  async createBooking(booking: IBooking): Promise<IBooking> {
    return this._bookingRepository.createBooking(booking);
  }

  async getBooking(bookingId: string): Promise<IBooking | null> {
    return this._bookingRepository.getBookingById(bookingId);
  }

  async confirmBooking(bookingId: string): Promise<IBooking | null> {
    return this._bookingRepository.updateBookingStatus(bookingId, "confirmed");
  }

  async cancelBooking(bookingId: string): Promise<IBooking | null> {
    return this._bookingRepository.updateBookingStatus(bookingId, "cancelled");
  }

  async getUserBookings(userId: string): Promise<IBooking[]> {
    return this._bookingRepository.getBookingsByUser(userId);
  }
}
