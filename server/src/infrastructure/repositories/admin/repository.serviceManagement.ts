import { responseVenueDTO } from "../../../config/DTO/host/dto.venue";
import { VenueModel } from "../../../domain/models/venueModel";
import { IServiceManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.serviceManagement";

export class ServiceManagementRepository implements IServiceManagementRepository {
  async findAllServices(): Promise<responseVenueDTO[]> {
    return VenueModel.find().exec();
  }
 
}
