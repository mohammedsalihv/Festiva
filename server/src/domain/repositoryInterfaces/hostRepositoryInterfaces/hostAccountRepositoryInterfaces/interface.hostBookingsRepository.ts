import { Types } from "mongoose";
import { IBooking } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.booking";

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
  getDashboardBookings(hostId: string | Types.ObjectId): Promise<IBooking[]>;
}
