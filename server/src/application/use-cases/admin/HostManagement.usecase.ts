import { IHost } from "../../../domain/entities/modelInterface/host.interface";
import { IHostManagementRepository } from "../../../domain/entities/repositoryInterface/admin/hostManagement.interface";
import CustomError from "../../../utils/CustomError";
import { EditHostPayload } from "../../../domain/entities/modelInterface/editHost.interface";

export class HostManagementUseCase {
  constructor(private HostManagementRepository: IHostManagementRepository) {}

  async execute(): Promise<IHost[]> {
    const hosts = await this.HostManagementRepository.findAllHosts();
    if (!hosts || hosts.length === 0) {
      throw new CustomError("Users empty", 401);
    }

    return hosts;
  }

  async HostBlockUnblock(hostId: string, isBlocked: boolean): Promise<boolean> {
    const response = await this.HostManagementRepository.HostblockUnblock(
      hostId,
      isBlocked
    );
    if (!response) {
      throw new CustomError("Blocking failed", 500);
    }
    return response;
  }

   async editHost(hostId: string, form: EditHostPayload): Promise<IHost[]> {
      const response = await this.HostManagementRepository.editHost(hostId, form);
    
      if (!response || response.length === 0) {
        throw new CustomError("Host update failed", 500);
      }
    
      return response;
    }
}
