import { responseVenueDTO } from "../../../config/DTO/host/dto.venue";
import { IServiceManagementRepository } from "../../../domain/entities/repositoryInterface/admin/interface.serviceManagement";
import CustomError from "../../../utils/CustomError";

export class ServiceManagementUseCase {
  constructor(
    private ServiceManagementRepository: IServiceManagementRepository
  ) {}

  async execute(): Promise<responseVenueDTO[]> {
    const services = await this.ServiceManagementRepository.findAllServices();
    if (!services || services.length === 0) {
      throw new CustomError("Services empty", 401);
    }

    return services;
  }
}
