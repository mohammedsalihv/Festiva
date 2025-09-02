import { IBooking } from "../../../modelInterface/base/interface.booking";

export interface IAdminBookingManagementRepository {
  getAllBookings(
    page: number,
    limit: number
  ): Promise<{ bookings: IBooking[]; totalPages: number }>;
}
