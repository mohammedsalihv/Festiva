import { responseHostDTO } from "../../../../types/DTO/host/dto.host";
import { IAdminHostManagementUseCase } from "../../../../domain/usecaseInterface/admin/Managemenet usecase interfaces/interface.adminHostManagementUseCase";
import { IAdminHostManagementRepository } from "../../../../domain/entities/repositoryInterface/admin/management/interface.adminHostManagement";
import CustomError from "../../../../utils/common/errors/CustomError";
import { EditHostPayload } from "../../../../domain/adminInterface/interface.editHost";
import {
  statusCodes,
  statusMessages,
} from "../../../../utils/common/messages/constantResponses";
import { responseAllHostsDTO } from "../../../../types/DTO/host/dto.host";

export class AdminHostManagementUseCase implements IAdminHostManagementUseCase{
  constructor(
    private AdminHostManagementRepository: IAdminHostManagementRepository
  ) {}

   async findAllHosts(page: number, limit: number): Promise<responseAllHostsDTO> {
    const response = await this.AdminHostManagementRepository.findAllHosts(page, limit);
    
    if (!response.data || response.data.length === 0) {
      throw new CustomError("No hosts found", statusCodes.notfound);
    }

    return response;
  }

  async HostblockUnblock(hostId: string, isBlocked: boolean): Promise<boolean> {
    const response = await this.AdminHostManagementRepository.HostblockUnblock(
      hostId,
      isBlocked
    );
    if (!response) {
      throw new CustomError(
        statusMessages.accountBlocked,
        statusCodes.serverError
      );
    }
    return response;
  }

  async editHost(
    hostId: string,
    form: EditHostPayload
  ): Promise<responseHostDTO[]> {
    const response = await this.AdminHostManagementRepository.editHost(
      hostId,
      form
    );

    if (!response || response.length === 0) {
      throw new CustomError("Host update failed", statusCodes.serverError);
    }

    return response;
  }

  async changeProfile(
    hostId: string,
    imageUrl: string
  ): Promise<responseHostDTO> {
    const response = await this.AdminHostManagementRepository.changeProfile(
      hostId,
      imageUrl
    );

    if (!response) {
      throw new CustomError(
        "Profile photo update failed",
        statusCodes.serverError
      );
    }
    return response;
  }

  async deleteHost(hostId: string): Promise<boolean> {
    const result = await this.AdminHostManagementRepository.deleteHost(hostId);
    if (!result) {
      throw new CustomError("Deleting failed", statusCodes.serverError);
    }
    return result;
  }
}
