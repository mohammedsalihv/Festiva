import { IBooking } from "../../../entities/modelInterface/base/interface.booking";



export interface IHostBookingsUseCase {
  recivedBookings(
    hostId: string,
    page: number,
    limit: number
  ): Promise<{ bookings: IBooking[]; totalPages: number }>;
}
