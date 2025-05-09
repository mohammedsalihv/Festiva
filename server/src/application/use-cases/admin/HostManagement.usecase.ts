import { IHost } from "../../../domain/entities/modelInterface/host.interface";
import { IHostManagementRepository } from "../../../domain/entities/repositoryInterface/admin/hostManagement.interface";
import CustomError from "../../../utils/CustomError";

export class HostManagementUseCase {
  constructor(private UserManagementRepository: IHostManagementRepository) {}

  async execute(): Promise<IHost[]> {
    const hosts = await this.UserManagementRepository.findAllHosts();
    if (!hosts || hosts.length === 0) {
      throw new CustomError("Users empty", 401);
    }

    return hosts;
  }
}
