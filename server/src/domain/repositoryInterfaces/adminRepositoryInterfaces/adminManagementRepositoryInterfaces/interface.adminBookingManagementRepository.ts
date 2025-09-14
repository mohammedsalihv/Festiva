import { IBooking } from "../../../entities/databaseModelInterfaces/baseModelInterfaces/interface.booking";

export interface IAdminBookingManagementRepository {
  findBookings(
    page: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ bookings: IBooking[]; totalPages: number }>;
  getAllBookings(): Promise<IBooking[]>;
}
