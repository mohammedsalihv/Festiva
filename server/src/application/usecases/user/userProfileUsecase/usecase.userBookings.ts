import { IUserBookingsRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userBookingsRepository";
import { IUserBookingUseCase } from "../../../../domain/usecaseInterface/user/userProfileUsecaseInterfaces/interface.userBookingsUseCase";
import { userMyBookingsResponse } from "../../../../types/DTO/user/dto.userBookings";
import { userBookingsMapping } from "../../../../utils/mapping/user/userBookingMapper";

export class UserBookingsUseCase implements IUserBookingUseCase {
  constructor(private _userBookingRepository: IUserBookingsRepository) {}

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
}
