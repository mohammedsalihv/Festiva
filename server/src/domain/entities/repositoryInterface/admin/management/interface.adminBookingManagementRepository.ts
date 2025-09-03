import { IBooking } from "../../../modelInterface/base/interface.booking";

export interface IAdminBookingManagementRepository {
  getAllBookings(
    page: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ bookings: IBooking[]; totalPages: number }>;
}
