import { adminBookingsResponse } from "../../../../types/DTO/admin/dto.adminBookings";

export interface IAdminBookingManagementUseCase {
  allBookings(
    page: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ booking: adminBookingsResponse[]; totalPages: number }>;
}
