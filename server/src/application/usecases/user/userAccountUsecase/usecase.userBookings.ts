import { IUserBookingsRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAccountRepositoryInterfaces/interface.userBookingsRepository";
import { IUserBookingUseCase } from "../../../../domain/usecaseInterfaces/userUsecaseInterfaces/userProfileUsecaseInterfaces/interface.userBookingsUseCase";
import {
  userBookingDetailsResponse,
  userMyBookingsResponse,
} from "../../../../types/DTO's/userDTO's/userBaseDTO's/dto.userBookings";
import {
  mapBookingDetails,
  userBookingsMapping,
} from "../../../../utils/mapping/userMappings/userBookingMapper";
import { IPaymentRepository } from "../../../../domain/repositoryInterfaces/baseRepositoryInterfaces/basePaymentsRepositoryInterfaces/interface.paymentRepository";
import { IHostRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostBaseRepositoryInterfaces/interface.hostRepository";
import { ILocationRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostBaseRepositoryInterfaces/interface.locationRepostory";

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
