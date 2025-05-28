import { responseVenueDTO } from "../../../config/DTO/host/dto.venue";
import { VenueModel } from "../../../domain/models/venueModel";
import { IServiceManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.serviceManagement";

export class ServiceManagementRepository
  implements IServiceManagementRepository
{
  async findAllServices(): Promise<responseVenueDTO[]> {
    const respnse = await VenueModel.find().exec();
    return respnse
  }
}
