import { userMyBookingsResponse } from "../../../../types/DTO/user/dto.userBookings";

export interface IUserBookingUseCase {
  allBookings(
    userId: string,
    page: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ bookings: userMyBookingsResponse[]; totalPages: number }>;
}
