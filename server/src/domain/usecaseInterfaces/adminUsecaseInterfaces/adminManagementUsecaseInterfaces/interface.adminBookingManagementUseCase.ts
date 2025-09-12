import { adminBookingsResponse } from "../../../../types/DTO's/adminDTO's/adminAccountDTO's/dto.adminBookings";

export interface IAdminBookingManagementUseCase {
  allBookings(
    page: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ booking: adminBookingsResponse[]; totalPages: number }>;
}
