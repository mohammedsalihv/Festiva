import { Types } from "mongoose";
import { IHostBookingsRepository } from "../../../../domain/entities/repositoryInterface/host/account repository interfaces/interface.hostBookingsRepository";
import { IHostPaymentRepository } from "../../../../domain/entities/repositoryInterface/host/hostBaseRepositoryInterfaces/interface.hostPaymentRepository";
import { IHostCatersRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostCatersRepository";
import { IHostRentCarRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostRentCarRepository";
import { IHostStudioRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostStudioRepository";
import { IHostVenueRepository } from "../../../../domain/entities/repositoryInterface/host/services repository interface/interface.hostVenueRepository";
import { IHostDashboardUseCase } from "../../../../domain/usecaseInterface/host/accountUsecaseInterfaces/interface.hostDashboardUseCase";
import {
  mapAssetsToOverview,
  mapBookingsToRecent,
  mapBookingsToStats,
  mapBookingsToTable,
  mapPaymentsToRevenue,
} from "../../../../utils/mapping/host/hostDashboard.mapper";

export class HostDashbaordUseCase implements IHostDashboardUseCase {
  constructor(
    private _hostBookingsRepository: IHostBookingsRepository,
    private _hostPaymentRepository: IHostPaymentRepository,
    private _hostVenuesRepository: IHostVenueRepository,
    private _hostRentcarRepository: IHostRentCarRepository,
    private _hostCatersRepository: IHostCatersRepository,
    private _hostStudioRepository: IHostStudioRepository,
  ) {}

  async dashboard(hostId: string | Types.ObjectId) {
    const hostBookings =
      await this._hostBookingsRepository.getDashboardBookings(hostId);

      console.log(hostBookings)
      
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

    return {
      revenues: [mapPaymentsToRevenue(hostPayments)],
      assetOverview: mapAssetsToOverview(
        hostVenues,
        hostRentcars,
        hostCaters,
        hostStudios
      ),
      bookingStatistics: mapBookingsToStats(hostBookings),
      recentBookings: mapBookingsToRecent(hostBookings),
      bookingTable: mapBookingsToTable(hostBookings, hostPayments),
    };
  }
}
