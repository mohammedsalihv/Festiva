// AdminBookingManagement.ts
import { IAdminBookingManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminBookingManagementRepository";
import { IHostRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRepository";
import { IUserRepository } from "../../../../domain/entities/repositoryInterface/user/account/interface.userRepository";
import { IAdminBookingManagementUseCase } from "../../../../domain/usecaseInterface/admin/managementUsecaseInterfaces/interface.adminBookingManagementUseCase";
import { adminBookingsResponse } from "../../../../types/DTO/admin/dto.adminBookings";
import { adminBookingMapper } from "../../../../utils/mapping/admin/adminBookingMapper";

export class AdminBookingManagementUseCase
  implements IAdminBookingManagementUseCase
{
  constructor(
    private _adminBookingRepository: IAdminBookingManagementRepository,
    private _hostRepository: IHostRepository,
    private _userRepository: IUserRepository
  ) {}

  async allBookings(
    page: number,
    limit: number
  ): Promise<{ booking: adminBookingsResponse[]; totalPages: number }> {
    const { bookings, totalPages } =
      await this._adminBookingRepository.getAllBookings(page, limit);

    if (!bookings || bookings.length === 0) {
      return { booking: [], totalPages: 0 };
    }

    const adminMappedBookings = await Promise.all(
      bookings.map(async (booking) => {
        const host = booking.bookedData?.host
          ? await this._hostRepository.findById(booking.bookedData.host)
          : null;

        const user = booking.userId
          ? await this._userRepository.findById(booking.userId)
          : null;

        return adminBookingMapper(booking, host, user);
      })
    );

    return { booking: adminMappedBookings, totalPages };
  }
}
