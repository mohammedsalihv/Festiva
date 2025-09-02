import { IUserBookingsRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userBookingsRepository";
import { IUserBookingUseCase } from "../../../../domain/usecaseInterface/user/userProfileUsecaseInterfaces/interface.userBookingsUseCase";
import {
  userBookingDetailsResponse,
  userMyBookingsResponse,
} from "../../../../types/DTO/user/dto.userBookings";
import {
  mapBookingDetails,
  userBookingsMapping,
} from "../../../../utils/mapping/user/userBookingMapper";
import { IPaymentRepository } from "../../../../domain/entities/repositoryInterface/base/interface.paymentRepository";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import { ILocationRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.locationRepostory";

export class UserBookingsUseCase implements IUserBookingUseCase {
  constructor(
    private _userBookingRepository: IUserBookingsRepository,
    private _paymentRepository: IPaymentRepository,
    private _hostRepository: IHostRepository,
    private _locationRepository: ILocationRepository
  ) {}

  async allBookings(
    userId: string,
    page: number,
    limit: number,
    sortBy?: string,
    searchBy?: string,
    tabBy?: string
  ): Promise<{ bookings: userMyBookingsResponse[]; totalPages: number }> {
    const skip = (page - 1) * limit;
    const { bookings, total } = await this._userBookingRepository.findBookings(
      userId,
      skip,
      limit,
      sortBy,
      searchBy,
      tabBy
    );
    const totalPages = Math.ceil(total / limit);
    const mappedBookings = userBookingsMapping(bookings);
    return { bookings: mappedBookings, totalPages: totalPages };
  }

  async bookingDetails(
    bookingId: string
  ): Promise<userBookingDetailsResponse | null> {
    const booking = await this._userBookingRepository.findBookingDetails(
      bookingId
    );

    console.log("11", booking);

    if (!booking) return null;

    if (!booking.paymentId) {
      throw new Error("Booking has no paymentId");
    }
    const payment = await this._paymentRepository.paymentDetails(
      booking.paymentId
    );

    if (!booking.bookedData?.host) {
      throw new Error("Booking has no host");
    }
    if (!booking.bookedData?.location) {
      throw new Error("Booking has no host");
    }

    const host = await this._hostRepository.findById(booking.bookedData.host);
    const assetLocation = await this._locationRepository.findLocation(
      booking.bookedData.location
    );
    const mappedBookingDetails = mapBookingDetails(
      booking,
      payment,
      host,
      assetLocation
    );
    return mappedBookingDetails;
  }
}
