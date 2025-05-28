import { responseVenueDTO } from "../../../../config/DTO/host/dto.venue";

export interface IServiceManagementRepository {
  findAllServices(): Promise<responseVenueDTO[]>;
}
