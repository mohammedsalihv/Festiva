import { IBooking } from "../../../entities/modelInterface/base/interface.booking";

export interface IHostBookingsUseCase {
  recivedBookings(
    hostId: string,
    page: number,
    limit: number,
    status?: string
  ): Promise<{ bookings: IBooking[]; totalPages: number }>;
}
