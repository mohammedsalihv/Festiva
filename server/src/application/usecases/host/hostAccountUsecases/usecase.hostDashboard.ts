import { Types } from "mongoose";
import { IHostBookingsRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostAccountRepositoryInterfaces/interface.hostBookingsRepository";
import { IHostPaymentRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostBaseRepositoryInterfaces/interface.hostPaymentRepository";
import { IHostCatersRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostServicesRepositoryInterfaces/interface.hostCatersRepository";
import { IHostRentCarRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostServicesRepositoryInterfaces/interface.hostRentCarRepository";
import { IHostStudioRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostServicesRepositoryInterfaces/interface.hostStudioRepository";
import { IHostVenueRepository } from "../../../../domain/repositoryInterfaces/hostRepositoryInterfaces/hostServicesRepositoryInterfaces/interface.hostVenueRepository";
import { IHostDashboardUseCase } from "../../../../domain/usecaseInterfaces/hostUsecaseInterfaces/hostAccountUsecaseInterfaces/interface.hostDashboardUseCase";
import {
  mapAssetsToOverview,
  mapBookingsToRecent,
  mapBookingsToStats,
  mapBookingsToTable,
  mapPaymentsToRevenue,
} from "../../../../utils/mapping/hostMappings/hostDashboard.mapper";
import { IUserRepository } from "../../../../domain/repositoryInterfaces/userRepositoryInterfaces/userAccountRepositoryInterfaces/interface.userRepository";

export class HostDashbaordUseCase implements IHostDashboardUseCase {
  constructor(
    private _hostBookingsRepository: IHostBookingsRepository,
    private _hostPaymentRepository: IHostPaymentRepository,
    private _hostVenuesRepository: IHostVenueRepository,
    private _hostRentcarRepository: IHostRentCarRepository,
    private _hostCatersRepository: IHostCatersRepository,
    private _hostStudioRepository: IHostStudioRepository,
    private _userRepository: IUserRepository
  ) {}

  async dashboard(hostId: string | Types.ObjectId) {
    const hostBookings =
      await this._hostBookingsRepository.getDashboardBookings(hostId);

    const hostVenues = await this._hostVenuesRepository.getHostDashboardVenue(
      hostId
    );
    const hostRentcars =
      await this._hostRentcarRepository.getHostDashboardRentCar(hostId);
    const hostCaters = await this._hostCatersRepository.getHostDashboardCaters(
      hostId
    );
    const hostStudios = await this._hostStudioRepository.getHostDashboardStudio(
      hostId
    );
    const hostPayments =
      await this._hostPaymentRepository.getHostDashboardPayments(hostId);

    const userIds = [...new Set(hostBookings.map((b) => b.userId.toString()))];
    const users = (await this._userRepository.findByIds(userIds)) || [];

    return {
      revenues: [mapPaymentsToRevenue(hostPayments)],
      assetOverview: mapAssetsToOverview(
        hostVenues,
        hostRentcars,
        hostCaters,
        hostStudios
      ),
      bookingStatistics: mapBookingsToStats(hostBookings),
      recentBookings: mapBookingsToRecent(hostBookings, users),
      bookingTable: mapBookingsToTable(hostBookings, hostPayments, users),
    };
  }
}
