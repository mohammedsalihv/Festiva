import {
  userBookingDetailsResponse,
  userMyBookingsResponse,
} from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.userBookings";

export interface IUserBookingUseCase {
  allBookings(
    userId: string,
    page: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ bookings: userMyBookingsResponse[]; totalPages: number }>;
  bookingDetails(bookingId: string): Promise<userBookingDetailsResponse | null>;
}
