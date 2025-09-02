import { adminBookingsResponse } from "../../../../types/DTO/admin/dto.adminBookings";

export interface IAdminBookingManagementUseCase {
  allBookings(
    page: number,
    limit: number
  ): Promise<{ booking: adminBookingsResponse[]; totalPages: number }>;
}
