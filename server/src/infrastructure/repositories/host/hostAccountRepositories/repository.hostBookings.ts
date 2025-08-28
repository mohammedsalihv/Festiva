import { IBooking } from "../../../../domain/entities/modelInterface/base/interface.booking";
import { IHostBookingsRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostBookings";
import bookingModel from "../../../../domain/models/base/booking/bookingModel";

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
}
