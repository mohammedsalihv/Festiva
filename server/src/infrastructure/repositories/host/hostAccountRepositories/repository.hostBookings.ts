import { Types } from "mongoose";
import { IBooking } from "../../../../domain/entities/databaseModelInterfaces/baseModelInterfaces/interface.booking";
import { IHostBookingsRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAccountRepositoryInterfaces/interface.hostBookingsRepository";
import bookingModel from "../../../../domain/entities/databaseModels/baseModels/baseBookingModels/bookingModel";

export class HostBookingsRepository implements IHostBookingsRepository {
  async getAllBookings(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ bookings: IBooking[]; totalPages: number }> {
    const match: Record<string, any> = {
      "bookedData.host._id": hostId,
    };
    if (status) {
      match.status = status;
    }
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      bookingModel
        .find(match)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      bookingModel.countDocuments(match),
    ]);
    const totalPages = Math.ceil(total / limit);
    return { bookings: bookings as IBooking[], totalPages };
  }

  async updateStatus(
    bookingId: string,
    status: string,
    reason?: string
  ): Promise<boolean> {
    const result = await bookingModel.findByIdAndUpdate(bookingId, {
      status: status,
      bookingRejectedReason: reason,
    });
    return result ? true : false;
  }
  async getDashboardBookings(
    hostId: string | Types.ObjectId
  ): Promise<IBooking[]> {
    return await bookingModel.find({ "bookedData.host._id": hostId }).lean();
  }
}
