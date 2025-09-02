import { IBooking } from "../../../../domain/entities/modelInterface/base/interface.booking";
import { IAdminBookingManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminBookingManagementRepository";
import bookingModel from "../../../../domain/models/base/booking/bookingModel";

export class AdminBookingManagementRepository
  implements IAdminBookingManagementRepository
{
  async getAllBookings(
    page: number,
    limit: number
  ): Promise<{ bookings: IBooking[]; totalPages: number }> {
    const skip = (page - 1) * limit;
    const [bookings, total] = await Promise.all([
      bookingModel
        .find()
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .lean(),
      bookingModel.countDocuments(),
    ]);
    const totalPages = Math.ceil(total / limit);
    return { bookings: bookings as IBooking[], totalPages };
  }
}
